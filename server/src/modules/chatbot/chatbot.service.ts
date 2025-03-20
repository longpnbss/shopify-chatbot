import { Injectable } from '@nestjs/common'
import { ShopifyService } from 'src/shared/services/shopify.service'
import { PrismaClient, CategoryType } from '@prisma/client'
import { chatbotCategory } from './utils/const'

type ChatbotType = {
  question: string
  answer: string
  category: CategoryType
}
@Injectable()
export class ChatbotService {
  prisma: PrismaClient

  constructor(private readonly shopify: ShopifyService) {
    this.prisma = new PrismaClient()
  }

  async classifyQuestion(question: string) {
    const response = await fetch(
      `${process.env.URL_HUGGING_FACE}/models/facebook/bart-large-mnli`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: question,
          parameters: {
            candidate_labels: chatbotCategory,
          },
        }),
      },
    )

    const data = await response.json()

    return data.labels[0]
  }

  async reply(message: string) {
    const chatbotData = await this.prisma.chatbot.findMany()
    const category = await this.classifyQuestion(message || 'hi')
    const filterMessage = chatbotData.filter(
      (data) => data.category === category,
    )
    const messagesString = filterMessage.map((data) => data.answer).join('\n')
    const botResponse =
      messagesString || "Sorry, I don't understand your question."

    return {
      success: true,
      message: JSON.stringify(botResponse),
    }
  }

  async getAll() {
    return await this.prisma.chatbot.findMany()
  }

  async create(data: ChatbotType) {
    return await this.prisma.chatbot.create({ data })
  }

  async update(data: ChatbotType & { id: string }) {
    const { answer, category, id } = data

    return await this.prisma.chatbot.update({
      data: { answer, category },
      where: { id },
    })
  }

  async delete(id: string) {
    return await this.prisma.chatbot.delete({
      where: { id },
    })
  }
}
