import { Controller, Get, Post, Query } from '@nestjs/common'
import { ChatbotService } from '@/modules/chatbot/chatbot.service'

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('/generate')
  async generate() {
    return await this.chatbotService.generate()
  }

  @Get('/reply')
  async reply(@Query() query) {
    const { message } = query
    const messageFormatted = JSON.parse(message || 'null')

    return await this.chatbotService.reply(messageFormatted)
  }

  // @Post('/create')
  // async create(@Query() query) {
  //   const { message } = query
  //   const messageFormatted = JSON.parse(message || 'null')

  //   return await this.chatbotService.create(messageFormatted)
  // }
}
