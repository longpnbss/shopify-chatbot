import { useApi } from '@/hooks/useApi'
import { useToast } from '@shopify/app-bridge-react'
import { useCallback, useEffect, useState } from 'react'
import { ChatbotType } from './useListQuestion'

type props = {
  activeModalEdit: boolean
  setActiveModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  setQuestions: React.Dispatch<React.SetStateAction<ChatbotType>>
  questions: ChatbotType
  idsEdited: string
}

const useModalEdit = ({
  activeModalEdit,
  setActiveModalEdit,
  setQuestions,
  questions,
  idsEdited,
}: props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [editedAnswer, setEditedAnswer] = useState('')
  const [editedCategory, setEditedCategory] = useState('GENERAL')
  const { show } = useToast()
  const api = useApi()

  const toggleModalEdit = useCallback(
    () => setActiveModalEdit(!activeModalEdit),
    [activeModalEdit]
  )

  const handleEdit = async () => {
    setIsLoading(true)
    try {
      const data = {
        id: idsEdited,
        answer: editedAnswer,
        category: editedCategory,
      }
      const response = await api.put('/chatbot/update', { data })
      if (!response.data) {
        return
      }

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === response.data.id ? response.data : item
        )
      )
      toggleModalEdit()
      show('Edited successfully!', {
        duration: 2000,
        onDismiss: () => console.log('Toast edition dismissed'),
      })
    } catch (error) {
      console.error('Error to edit:', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const question = questions.find((question) => question.id === idsEdited)
    setEditedAnswer(question?.answer || '')
    setEditedCategory(question?.category || '')
  }, [idsEdited])

  return {
    editedAnswer,
    setEditedAnswer,
    editedCategory,
    setEditedCategory,
    toggleModalEdit,
    handleEdit,
    isLoading,
  }
}

export default useModalEdit
