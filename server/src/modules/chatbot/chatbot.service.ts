import { Injectable } from '@nestjs/common'
import { ShopifyService } from 'src/shared/services/shopify.service'
import { PrismaClient } from '@prisma/client'

type ChatbotType = {
  question: string
  answer: string
  category: string
}
@Injectable()
export class ChatbotService {
  prisma: PrismaClient

  constructor(private readonly shopify: ShopifyService) {
    this.prisma = new PrismaClient()
  }

  async reply(message: string) {
    const chatbotData = await this.prisma.chatbot.findMany()

    const filterMessage = chatbotData.find((data) => data.question === message)
    const botResponse =
      filterMessage?.answer || 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn.'

    return {
      success: true,
      message: botResponse,
    }
  }

  async getAll() {
    return await this.prisma.chatbot.findMany()
  }

  async create(data: ChatbotType) {
    return await this.prisma.chatbot.create({ data })
  }
}
