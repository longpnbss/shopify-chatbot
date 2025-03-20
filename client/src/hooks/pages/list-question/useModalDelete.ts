import { useApi } from '@/hooks/useApi'
import { useToast } from '@shopify/app-bridge-react'
import { useCallback, useEffect, useState } from 'react'
import { ChatbotType } from './useListQuestion'

type props = {
  activeModalDelete: boolean
  setActiveModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  setQuestions: React.Dispatch<React.SetStateAction<ChatbotType>>
  questions: ChatbotType
  idsDeleted: string
}

const useModalDelete = ({
  activeModalDelete,
  setActiveModalDelete,
  setQuestions,
  questions,
  idsDeleted,
}: props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [editedAnswer, setDeletedAnswer] = useState('')
  const [editedCategory, setDeletedCategory] = useState('GENERAL')
  const { show } = useToast()
  const api = useApi()

  const toggleModalDelete = useCallback(
    () => setActiveModalDelete(!activeModalDelete),
    [activeModalDelete]
  )

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      console.log(idsDeleted)

      const data = {
        id: idsDeleted,
      }
      const response = await api.delete('/chatbot/delete', { data })
      if (!response.data) {
        return
      }

      setQuestions((prev) =>
        prev.filter((item) => item.id !== response.data.id)
      )
      toggleModalDelete()
      show('Deleted successfully!', {
        duration: 2000,
        onDismiss: () => console.log('Toast deletion dismissed'),
      })
    } catch (error) {
      console.error('Error to delete:', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const question = questions.find((question) => question.id === idsDeleted)
    setDeletedAnswer(question?.answer || '')
    setDeletedCategory(question?.category || '')
  }, [idsDeleted])

  return {
    editedAnswer,
    setDeletedAnswer,
    editedCategory,
    setDeletedCategory,
    toggleModalDelete,
    handleDelete,
    isLoading,
  }
}

export default useModalDelete
