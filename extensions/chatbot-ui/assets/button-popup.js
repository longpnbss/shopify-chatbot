document.addEventListener("DOMContentLoaded", function () {
  const buttonPopup = document.getElementById("chatbot-popup-wrapper");

  buttonPopup.addEventListener("click", function () {
    this.classList.toggle("active");
    const chatbotUi = document.getElementById("chatbot-ui");
    chatbotUi.classList.toggle("active");
  });
});
