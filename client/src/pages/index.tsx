import { Card, Page, Layout } from '@shopify/polaris'

// import { useEffect } from 'react'
// import { useApi } from '@/hooks/useApi'
// import { useQuery } from '@tanstack/react-query'

export default function HomePage() {
  // const api = useApi()

  // const { data } = useQuery(['products'], () => {
  //   return api.get(`/products`)
  // })

  // const products = data?.data || []

  // useEffect(() => {
  //   console.log('Data Fetched', products)
  // }, [products])

  return (
    <Page narrowWidth>
      {/* <Layout> */}
        <Layout.Section>
          <Card background="bg-fill" roundedAbove="md">
            <h1 className="text-5xl text-black mb-5">Config chatbot</h1>
            
          </Card>
        </Layout.Section>
      {/* </Layout> */}
    </Page>
  )
}
