import { join } from 'path'
import { readFileSync } from 'fs'
import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as serveStatic from 'serve-static'

import shopify from './lib/shopify-app.js'
import bootstrap from './nest-main.js'
import setupSwagger from './lib/setup-swagger.js'

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || '3000',
  10,
)

const isProd = process.env.NODE_ENV === 'production'

const STATIC_PATH = join(
  __dirname,
  '..',
  '..',
  'client',
  `${isProd ? 'dist' : 'src'}`,
)

/**
 * Utility function to bypass middleware for a specific path
 * @param path
 * @param middleware
 * @returns
 */

const unless = function (paths: string[], middleware: express.RequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (paths.some((path) => validatePath(path, req.baseUrl))) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

const validatePath = function (path: string, baseUrl: string) {
  const splitPath = path.split('/')
  const splitBaseUrl = baseUrl.split('/')
  return splitPath.every(
    (item, index) => item == '*' || item == splitBaseUrl[index],
  )
}

async function main() {
  const app = express()

  // Set up Shopify authentication and webhook handling
  app.get(shopify.config.auth.path, shopify.auth.begin())
  app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    shopify.redirectToShopifyOrAppRoot(),
  )

  // For webhooks, see webhook.controller.ts

  // If you are adding routes outside of the /api path, remember to
  // also add a proxy rule for them in web/frontend/vite.config.js

  const nestApp = await bootstrap(app)

  nestApp.use(
    '/api/*',
    unless(
      ['/api/webhooks', '/api/chatbot/*'],
      shopify.validateAuthenticatedSession(),
    ),
  )

  // nestApp.use(
  //   '/api/chatbot/*',
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const token = req.headers['authorization']
  //     if (!token || token != `Bearer ${process.env.INTEGRATION_TOKEN}`) {
  //       res.status(403).send({ success: false, message: 'Invalid token' })
  //       return
  //     }

  //     return next()
  //   },
  // )

  nestApp
    .use('/api/webhooks', express.text({ type: '*/*' }))
    .use(express.json({ limit: '50mb' }))

  nestApp.use(shopify.cspHeaders())
  nestApp.use(serveStatic(STATIC_PATH, { index: false }))

  setupSwagger(nestApp, shopify)

  nestApp.use(async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl
    if (url.startsWith('/api')) {
      console.log(`Bypassing API ${url} in static index middleware`)
      return next()
    }

    const customNextFn = () => {
      console.log('Serving index.html')
      return res
        .status(200)
        .set('Content-Type', 'text/html')
        .send(readFileSync(join(STATIC_PATH, 'index.html')))
    }

    return shopify.ensureInstalledOnShop()(req, res, customNextFn)
  })

  nestApp.listen(PORT).then(() => {
    console.log(`> BE ready on ${PORT}`)
  })
}

main()
