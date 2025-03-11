import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SharedModule } from './shared/shared.module'
import { WebhooksModule } from './modules/webhooks/webhooks.module'
import { ProductModule } from './modules/product/product.module'
import { ChatbotModule } from './modules/chatbot/chatbot.module'
import { DevtoolsModule } from '@nestjs/devtools-integration'

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 5434,
    }),
    ConfigModule.forRoot(),
    SharedModule,
    WebhooksModule,
    ProductModule,
    ChatbotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
