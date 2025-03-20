import { useApi } from '@/hooks/useApi'
import { useCallback, useEffect, useState } from 'react'

export type ChatbotType = {
  id: string
  answer: string
  category: string
}[]

type props = {
  optionCategory: {
    label: string
    value: string
  }[]
}

const useListQuestion = ({ optionCategory }: props) => {
  const api = useApi()
  const [questions, setQuestions] = useState<ChatbotType>([])
  const [activeModalCreate, setActiveModalCreate] = useState(false)
  const [activeModalEdit, setActiveModalEdit] = useState(false)
  const [activeModalDelete, setActiveModalDelete] = useState(false)
  const [idsEdited, setIdsEdited] = useState('')
  const [idsDeleted, setIdsDeleted] = useState('')

  //   const test = async () => {
  //     const response = await api.get('/chatbot/reply')
  //     console.log(response)
  //   }

  const openModalCreate = useCallback(
    () => setActiveModalCreate(!activeModalCreate),
    [activeModalCreate]
  )

  const categoryGenerated = (category: string) =>
    optionCategory.find((opt) => opt.value === category)?.label

  const rows = questions.map((q) => [
    q.answer,
    categoryGenerated(q.category) || q.category,
  ])

  const handleActionEdit = (id: string) => {
    setIdsEdited(id)
    setTimeout(() => {
      setActiveModalEdit(true)
    }, 50)
  }

  const handleActionDelete = (id: string) => {
    setIdsDeleted(id)
    setTimeout(() => {
      setActiveModalDelete(true)
    }, 50)
  }

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/chatbot/get')
      setQuestions(response.data)
    }

    getData()
  }, [])

  return {
    rows,
    questions,
    openModalCreate,
    activeModalCreate,
    setActiveModalCreate,
    setQuestions,
    activeModalEdit,
    setActiveModalEdit,
    idsEdited,
    handleActionEdit,
    handleActionDelete,
    activeModalDelete,
    setActiveModalDelete,
    idsDeleted,
  }
}

export default useListQuestion
