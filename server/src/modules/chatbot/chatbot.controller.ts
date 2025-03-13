import { ChatbotService } from '@/modules/chatbot/chatbot.service'
import { Controller, Get, Post, Query, Req } from '@nestjs/common'

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('/reply')
  async reply(@Query() query) {
    const { message } = query
    const messageFormatted = JSON.parse(message || 'null')

    return await this.chatbotService.reply(messageFormatted)
  }

  @Get('/get')
  async get() {
    return await this.chatbotService.getAll()
  }

  @Post('/create')
  async create(@Req() req) {
    const data = req.body.data

    return await this.chatbotService.create(data)
  }
}
