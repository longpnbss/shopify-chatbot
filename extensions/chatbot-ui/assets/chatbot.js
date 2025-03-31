const APP_PROXY = "/apps/chatbot";

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("chatbot-input");
  const form = document.getElementById("chatbot-input-container");
  const messagesContainer = document.getElementById("chatbot-conversation");
  const chatbotContent = document.getElementById("chatbot-content");
  const suggestions = document.querySelectorAll(".response-card-option");
  const buttonPopup = document.getElementById("chatbot-popup-wrapper");

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
    const container = document.getElementById("chatbot-content");
    const messageLoading = document.createElement("div");
    messageLoading.className = "chatbot-message-wrapper bot";
    messageLoading.innerHTML = `
      <div class"chatbot-avatar">
        <img class="chatbot-avatar-image" src="${chatbotLogo}">
      </div>
      <div class="chatbot-message">
        <div class="chatbot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    messagesContainer.appendChild(messageLoading);
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    return messageLoading;
  };

  const scrollToBottom = () => {
    const container = document.getElementById("chatbot-content");
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
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

      console.log(response.message, typeof response.message);
      

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
        innerHTML: `
          <div class"chatbot-avatar">
            <img class="chatbot-avatar-image" src="${chatbotLogo}">
          </div>
          <div class="chatbot-message">${botReply}</div>`,
      })
    );

    setTimeout(() => {
      if (chatbotContent.classList.contains("on-chat")) {
        chatbotContent.classList.remove("on-chat");
      }

      scrollToBottom();
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

  buttonPopup.addEventListener("click", function () {
    this.classList.toggle("active");
    const chatbotContainer = document.getElementById("chatbot-container");
    chatbotContainer.classList.toggle("active");
  });
});
