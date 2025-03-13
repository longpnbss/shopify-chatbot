import {
  CalloutCard,
  Card,
  DataTable,
  FormLayout,
  Layout,
  Modal,
  Page,
  Select,
  TextField,
  Text,
} from '@shopify/polaris'

import { useApi } from '@/hooks/useApi'
import { useCallback, useEffect, useState } from 'react'

const optionCategory = [
  { label: 'General', value: 'general' },
  { label: 'Shipping', value: 'shipping' },
  { label: 'Returns', value: 'returns' },
  { label: 'Payment method', value: 'payment-method' },
]
type ChatbotType = {
  question: string
  answer: string
  category: string
}[]

export default function HomePage() {
  const api = useApi()

  const [questions, setQuestions] = useState<ChatbotType>([])

  const [active, setActive] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [newCategory, setNewCategory] = useState('General')

  const toggleModal = useCallback(() => setActive(!active), [active])

  const handleSave = async () => {
    const data = {
      question: newQuestion,
      answer: newAnswer,
      category: newCategory,
    }
    const response = await api.post('/chatbot/create', { data })
    console.log(response)

    setQuestions([...questions, data])
    toggleModal()
  }

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/chatbot/get')
      console.log('Data Fetched', response)

      setQuestions(response.data)
    }

    getData()
  }, [])

  const headings = [
    <Text variant="headingMd" as="h6" key="question">
      Question
    </Text>,
    <Text variant="headingMd" as="h6" key="answer">
      Answer
    </Text>,
    <Text variant="headingMd" as="h6" key="category">
      Category
    </Text>,
  ]

  const categoryGenerated = (category: string) =>
    optionCategory.find((opt) => opt.value === category)?.label

  const rows = questions.map((q) => [
    q.question,
    q.answer,
    categoryGenerated(q.category) || q.category,
  ])

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <CalloutCard
            title={
              <Text variant="heading3xl" as="h2">
                List questions
              </Text>
            }
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Add new question',
              onAction: toggleModal,
            }}
          >
            <Card>
              <DataTable
                columnContentTypes={['text', 'text', 'text']}
                headings={headings}
                rows={rows}
              />
            </Card>
            <Modal
              open={active}
              onClose={toggleModal}
              title="Add new question"
              primaryAction={{ content: 'Lưu', onAction: handleSave }}
            >
              <Modal.Section>
                <FormLayout>
                  <TextField
                    label={
                      <Text variant="heading3xl" as="h4">
                        Question
                      </Text>
                    }
                    value={newQuestion}
                    onChange={(val) => setNewQuestion(val)}
                    autoComplete="off"
                  />
                  <TextField
                    label="Trả lời"
                    value={newAnswer}
                    onChange={(val) => setNewAnswer(val)}
                    autoComplete="off"
                  />
                  <Select
                    label="Danh mục"
                    options={optionCategory}
                    value={newCategory}
                    onChange={(val) => setNewCategory(val)}
                  />
                </FormLayout>
              </Modal.Section>
            </Modal>
          </CalloutCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
