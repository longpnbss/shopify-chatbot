import { ChatbotType } from '@/hooks/pages/list-question/useListQuestion'
import useModalDelete from '@/hooks/pages/list-question/useModalDelete'
import { Text, Modal } from '@shopify/polaris'

type props = {
  activeModalDelete: boolean
  setActiveModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  setQuestions: React.Dispatch<React.SetStateAction<ChatbotType>>
  questions: ChatbotType
  idsDeleted: string
}
export default function ModalDelete({
  activeModalDelete,
  setActiveModalDelete,
  setQuestions,
  questions,
  idsDeleted,
}: props) {
  const {
    toggleModalDelete,
    handleDelete,
  } = useModalDelete({
    activeModalDelete,
    setActiveModalDelete,
    setQuestions,
    questions,
    idsDeleted,
  })

  return (
    <Modal
      open={activeModalDelete}
      onClose={toggleModalDelete}
      title="Delete question"
      primaryAction={{ content: 'Delete', onAction: handleDelete }}
    >
      <Modal.Section>
        <Text as="p">Are you sure you want to delete?</Text>
      </Modal.Section>
    </Modal>
  )
}
