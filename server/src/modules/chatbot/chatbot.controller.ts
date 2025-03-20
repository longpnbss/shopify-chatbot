import { ChatbotService } from '@/modules/chatbot/chatbot.service'
import { Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common'

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

  @Put('/update')
  async update(@Req() req) {
    const data = req.body.data

    return await this.chatbotService.update(data)
  }

  @Delete('/delete')
  async delete(@Req() req) {
    const id = req.body.id

    return await this.chatbotService.delete(id)
  }
}
