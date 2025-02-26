import { Body, Controller, Get } from '@nestjs/common'
import { ChatbotService } from './chatbot.service'

@Controller('chatbot')
export class ProductController {
  constructor(private readonly ChatbotService: ChatbotService) {}

  @Get('/generate')
  async generate() {
    return await this.ChatbotService.generate()
  }

  @Get('/reply')
  async reply(@Body() body) {
    const { message } = body

    return await this.ChatbotService.reply(message)
  }
}
