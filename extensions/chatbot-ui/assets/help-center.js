// List step
const HELP_CENTER = "help-center";
const FAQS = "faqs";
const SUGGESTION = "suggestion";

document.addEventListener("DOMContentLoaded", function () {
  const helpCenterOptions = document.querySelectorAll(
    ".chatbot-help-center-option"
  );

  function showStep(step) {
    document
      .querySelectorAll(".chatbot-step")
      .forEach((el) => el.classList.remove("active"));
    document.getElementById("chatbot-step-" + step).classList.add("active");
  }

  helpCenterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      showStep(option.id);
    });
  });

  showStep(HELP_CENTER);
});
