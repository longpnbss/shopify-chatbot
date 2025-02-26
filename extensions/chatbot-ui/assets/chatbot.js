document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.createElement("div");
  chatBox.id = "chatbot-container";
  chatBox.innerHTML = `
    <div id="chatbot-header">Hi, how can we help?</div>
    <div id="chatbot-messages"></div>
    <form id="chatbot-input-container">
      <input type="text" id="chatbot-input" placeholder="Send us a message..." />
      <button id="chatbot-send" type="submit">Send</button>
    </form>
  `;
  document.body.appendChild(chatBox);

  const input = document.getElementById("chatbot-input");
  const form = document.getElementById("chatbot-input-container");
  const messagesContainer = document.getElementById("chatbot-messages");

  function appendMessage(text, sender) {
    const messageWrapper = document.createElement("div");
    const message = document.createElement("div");
    messageWrapper.className = `chatbot-message-wrapper ${sender}`;
    message.className = `chatbot-message`;
    message.textContent = text;
    messageWrapper.appendChild(message);
    messagesContainer.appendChild(messageWrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const customerMessage = input.value.trim();
    if (!customerMessage) return;

    appendMessage(customerMessage, "customer");
    input.value = "";

    const response = await fetch("/apps/chatbot/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: customerMessage }),
    }).then((res) => res.json());

    appendMessage(response.response || "Sorry, I don't understand.", "bot");
  });
});
