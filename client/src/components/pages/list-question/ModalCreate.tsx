import { ChatbotType } from '@/hooks/pages/list-question/useListQuestion'
import useModalCreate from '@/hooks/pages/list-question/useModalCreate'
import { FormLayout, TextField, Select, Modal } from '@shopify/polaris'

type props = {
  activeModalCreate: boolean
  setActiveModalCreate: React.Dispatch<React.SetStateAction<boolean>>
  optionCategory: {
    label: string
    value: string
  }[]
  setQuestions: React.Dispatch<React.SetStateAction<ChatbotType>>
}
export default function ModalCreate({
  activeModalCreate,
  setActiveModalCreate,
  optionCategory,
  setQuestions,
}: props) {
  const {
    createdAnswer,
    setCreatedAnswer,
    createdCategory,
    setCreatedCategory,
    toggleModalCreate,
    handleCreate,
    isLoading,
  } = useModalCreate({ activeModalCreate, setActiveModalCreate, setQuestions })

  return (
    <Modal
      open={activeModalCreate}
      onClose={toggleModalCreate}
      title="Add new question"
      loading={isLoading}
      primaryAction={{ content: 'Save', onAction: handleCreate }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Answer"
            value={createdAnswer}
            onChange={(val) => setCreatedAnswer(val)}
            autoComplete="off"
          />
          <Select
            label="Category"
            options={optionCategory}
            value={createdCategory}
            onChange={(val) => setCreatedCategory(val)}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  )
}
