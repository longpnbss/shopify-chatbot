import { Controller, Get, Query } from '@nestjs/common'
import { ChatbotService } from './chatbot.service'

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly ChatbotService: ChatbotService) {}

  @Get('/generate')
  async generate() {
    return await this.ChatbotService.generate()
  }

  @Get('/reply')
  async reply(@Query() query) {
    const { message } = query
    const messageFormatted = JSON.parse(message || 'null')

    return await this.ChatbotService.reply(messageFormatted)
  }
}
