import { Injectable } from '@nestjs/common'
import { ShopifyService } from 'src/shared/services/shopify.service'
import { getResponse } from './utils/const'

@Injectable()
export class ChatbotService {
  constructor(private readonly shopify: ShopifyService) {}

  async generate() {
    const jsChatbot = `
    document.addEventListener("DOMContentLoaded", function () {
        if (document.getElementById("chatbot-container")) return;

        const chatbotContainer = document.createElement("div");
        chatbotContainer.id = "chatbot-container";
        chatbotContainer.style.position = "fixed";
        chatbotContainer.style.bottom = "20px";
        chatbotContainer.style.right = "20px";
        chatbotContainer.style.width = "300px";
        chatbotContainer.style.height = "400px";
        chatbotContainer.style.background = "white";
        chatbotContainer.style.border = "1px solid #ccc";
        chatbotContainer.style.borderRadius = "10px";
        chatbotContainer.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.1)";
        chatbotContainer.style.overflow = "hidden";
        document.body.appendChild(chatbotContainer);

        chatbotContainer.innerHTML = '<iframe src="${process.env.APP_URL}/chat-ui" style="width:100%; height:100%; border:none;"></iframe>';
    });
  `
    return jsChatbot
  }

  async reply(message: string) {
    const botResponse = getResponse(message)

    return {
      success: true,
      data: botResponse,
    }
  }
}
