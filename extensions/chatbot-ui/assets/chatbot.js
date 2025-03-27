const APP_PROXY = "/apps/chatbot";

document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.createElement("div");
  chatBox.id = "chatbot-container";
  chatBox.innerHTML = `
    <div id="chatbot-header" class="chatbot-header">
      <div class="chatbot-name">Assistant</div>
      <div class="chatbot-status">
        <div class="status-indicator"></div>
        <span>Online</span>
      </div>
    </div>
    <div id="chatbot-content" class="chatbot-content">
      <div id="chatbot-conversation" class="chatbot-conversation"></div>
      <div class="chatbot-suggestion-card">
        <div class="response-card-option">Information about product returns.</div>
        <div class="response-card-option">How long is the product warranty?</div>
        <div class="response-card-option">What is the payment method?</div>
      </div>
    </div>
    <form id="chatbot-input-container" class="chatbot-input-container">
      <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Send us a message..." />
      <button id="chatbot-send" class="chatbot-send" type="submit">Send</button>
    </form>
  `;
  document.body.appendChild(chatBox);

  const input = document.getElementById("chatbot-input");
  const form = document.getElementById("chatbot-input-container");
  const messagesContainer = document.getElementById("chatbot-conversation");
  const chatbotContent = document.getElementById("chatbot-content");
  const suggestions = document.querySelectorAll(".response-card-option");

  const appendMessage = (text, sender) => {
    const messageWrapper = document.createElement("div");
    const message = document.createElement("div");
    messageWrapper.className = `chatbot-message-wrapper ${sender}`;
    message.className = `chatbot-message`;
    message.textContent = text;
    messageWrapper.appendChild(message);
    messagesContainer.appendChild(messageWrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const showLoadingMessage = () => {
    const messageLoading = document.createElement("div");
    messageLoading.className = "chatbot-message-wrapper bot";
    messageLoading.innerHTML = `
      <div class="chatbot-message">
        <div class="chatbot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(messageLoading);
    return messageLoading;
  };

  const fetchChatbotReply = async (customerMessage) => {
    try {
      const response = await fetch(
        `${APP_PROXY}/api/chatbot/reply?message=${JSON.stringify(customerMessage)}`,
        {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        }
      ).then((res) => res.json());

      return response.success
        ? JSON.parse(response.message)
        : "Sorry, I don't understand.";
    } catch (error) {
      console.error("Chatbot API error:", error);

      return "Unable to get a response.";
    }
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    if (!chatbotContent.classList.contains("on-chat")) {
      chatbotContent.classList.add("on-chat");
    }

    appendMessage(messageText, "customer");
    input.value = "";

    const messageLoading = showLoadingMessage();
    const botReply = await fetchChatbotReply(messageText);

    messageLoading.replaceWith(
      Object.assign(document.createElement("div"), {
        className: "chatbot-message-wrapper bot",
        innerHTML: `<div class="chatbot-message">${botReply}</div>`,
      })
    );

    setTimeout(() => {
      if (chatbotContent.classList.contains("on-chat")) {
        chatbotContent.classList.remove("on-chat");
      }
    }, 5000);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    sendMessage(input.value);
  });

  suggestions.forEach((option) => {
    option.addEventListener("click", () => {
      sendMessage(option.textContent);
    });
  });
});
