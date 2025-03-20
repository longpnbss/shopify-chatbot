import { useApi } from '@/hooks/useApi'
import { useToast } from '@shopify/app-bridge-react'
import { useCallback, useState } from 'react'
import { ChatbotType } from './useListQuestion'

type props = {
  activeModalCreate: boolean
  setActiveModalCreate: React.Dispatch<React.SetStateAction<boolean>>
  setQuestions: React.Dispatch<React.SetStateAction<ChatbotType>>
}

const useModalCreate = ({
  activeModalCreate,
  setActiveModalCreate,
  setQuestions,
}: props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [createdAnswer, setCreatedAnswer] = useState('')
  const [createdCategory, setCreatedCategory] = useState('GENERAL')
  const { show } = useToast()
  const api = useApi()

  const toggleModalCreate = useCallback(
    () => setActiveModalCreate(!activeModalCreate),
    [activeModalCreate]
  )

  const handleCreate = async () => {
    setIsLoading(true)
    try {
      const data = {
        answer: createdAnswer,
        category: createdCategory,
      }
      const response = await api.post('/chatbot/create', { data })
      if (!response.data) {
        return
      }

      setQuestions((prev) => [...prev, response.data])
      toggleModalCreate()
      show('Create successfully!', {
        duration: 2000,
        onDismiss: () => console.log('Toast creation dismissed'),
      })
    } catch (error) {
      console.error('Error to create:', error)
    }
    setIsLoading(false)
  }

  return {
    createdAnswer,
    setCreatedAnswer,
    createdCategory,
    setCreatedCategory,
    toggleModalCreate,
    handleCreate,
    isLoading,
  }
}

export default useModalCreate
