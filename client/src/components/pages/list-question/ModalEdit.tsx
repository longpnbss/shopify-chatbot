import { ChatbotType } from '@/hooks/pages/list-question/useListQuestion'
import useModalEdit from '@/hooks/pages/list-question/useModalEdit'
import { FormLayout, TextField, Select, Modal } from '@shopify/polaris'

type props = {
  activeModalEdit: boolean
  setActiveModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  optionCategory: {
    label: string
    value: string
  }[]
  setQuestions: React.Dispatch<React.SetStateAction<ChatbotType>>
  questions: ChatbotType
  idsEdited: string
}
export default function ModalEdit({
  activeModalEdit,
  setActiveModalEdit,
  optionCategory,
  setQuestions,
  questions,
  idsEdited,
}: props) {
  const {
    editedAnswer,
    setEditedAnswer,
    editedCategory,
    setEditedCategory,
    toggleModalEdit,
    handleEdit,
    isLoading,
  } = useModalEdit({
    activeModalEdit,
    setActiveModalEdit,
    setQuestions,
    questions,
    idsEdited,
  })

  return (
    <Modal
      open={activeModalEdit}
      onClose={toggleModalEdit}
      title="Edit question"
      loading={isLoading}
      primaryAction={{ content: 'Save', onAction: handleEdit }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Answer"
            value={editedAnswer}
            onChange={(val) => setEditedAnswer(val)}
            autoComplete="off"
          />
          <Select
            label="Category"
            options={optionCategory}
            value={editedCategory}
            onChange={(val) => setEditedCategory(val)}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  )
}
