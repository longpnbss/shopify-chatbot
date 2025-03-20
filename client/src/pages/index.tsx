import ModalCreate from '@/components/pages/list-question/ModalCreate'
import ModalDelete from '@/components/pages/list-question/ModalDelete'
import ModalEdit from '@/components/pages/list-question/ModalEdit'
import useListQuestion from '@/hooks/pages/list-question/useListQuestion'
import {
  Button,
  CalloutCard,
  Card,
  IndexTable,
  InlineGrid,
  Layout,
  Page,
  Text,
  useIndexResourceState,
} from '@shopify/polaris'
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons'

const optionCategory = [
  { label: 'General', value: 'GENERAL' },
  { label: 'Shipping', value: 'SHIPPING' },
  { label: 'Returns', value: 'RETURN' },
  { label: 'Payment method', value: 'PAYMENT' },
  { label: 'Warranty', value: 'WARRANTY' },
]

export default function HomePage() {
  const {
    rows,
    questions,
    openModalCreate,
    activeModalCreate,
    setActiveModalCreate,
    setQuestions,
    activeModalEdit,
    setActiveModalEdit,
    handleActionEdit,
    handleActionDelete,
    idsEdited,
    activeModalDelete,
    setActiveModalDelete,
    idsDeleted,
  } = useListQuestion({ optionCategory })

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(questions)

  const rowMarkup = questions.map(({ id, answer, category }, index) => (
    <IndexTable.Row
      id={id}
      key={index}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>{answer}</IndexTable.Cell>
      <IndexTable.Cell>{category}</IndexTable.Cell>
      <IndexTable.Cell>
        <InlineGrid gap="100" columns={2} alignItems="center">
          <Button
            onClick={() => handleActionEdit(id)}
            size="slim"
            icon={EditIcon}
          />
          <Button
            onClick={() => handleActionDelete(id)}
            size="slim"
            icon={DeleteIcon}
            tone="critical"
            variant="primary"
          />
        </InlineGrid>
      </IndexTable.Cell>
    </IndexTable.Row>
  ))

  console.log(questions)

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <CalloutCard
            title={
              <Text variant="heading3xl" as="p">
                List questions
              </Text>
            }
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Add new question',
              onAction: openModalCreate,
            }}
          >
            <Card>
              <IndexTable
                resourceName={{
                  singular: 'order',
                  plural: 'orders',
                }}
                itemCount={rows.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: 'Answer' },
                  { title: 'Category' },
                  { title: 'Actions' },
                ]}
                selectable={false}
              >
                {rowMarkup}
              </IndexTable>
            </Card>
            <ModalCreate
              activeModalCreate={activeModalCreate}
              setActiveModalCreate={setActiveModalCreate}
              optionCategory={optionCategory}
              setQuestions={setQuestions}
            />
            <ModalEdit
              activeModalEdit={activeModalEdit}
              setActiveModalEdit={setActiveModalEdit}
              optionCategory={optionCategory}
              setQuestions={setQuestions}
              questions={questions}
              idsEdited={idsEdited}
            />
            <ModalDelete
              activeModalDelete={activeModalDelete}
              setActiveModalDelete={setActiveModalDelete}
              setQuestions={setQuestions}
              questions={questions}
              idsDeleted={idsDeleted}
            />
          </CalloutCard>
          {/* <Button onClick={test} size="large">
            Button test
          </Button> */}
        </Layout.Section>
      </Layout>
    </Page>
  )
}
