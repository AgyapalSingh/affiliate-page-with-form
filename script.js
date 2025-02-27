document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = currentDate;
});

const addMoreLinksBtn = document.querySelector(".add-more-links");
const additionalLinksDiv = document.querySelector(".additional-links");
const form = document.getElementById("contactForm");

addMoreLinksBtn.addEventListener("click", function (event) {
  event.preventDefault(); 

  if (
    additionalLinksDiv.style.display === "none" ||
    additionalLinksDiv.style.display === ""
  ) {
    additionalLinksDiv.style.display = "flex";
    addMoreLinksBtn.textContent = "Remove Links";
  } else {
    additionalLinksDiv.style.display = "none";
    addMoreLinksBtn.textContent = "Add More Links";
    additionalLinksDiv
      .querySelectorAll("input")
      .forEach((input) => (input.value = ""));
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const formResponse = document.getElementById("formResponse");
  formResponse.textContent = "Submitting your response, please wait...";

  const formData = new FormData(this);
  fetch(
    "https://script.google.com/macros/s/AKfycbzyK27uHjVUMiREXn5xIu3i0CPGayPNsv0OInpZ46K3yKAi8gm2YuabLl2K284WiBw/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      formResponse.textContent =
        "Thank you! Your submission has been received.";
      form.reset();
      const currentDate = new Date().toISOString().split("T")[0];
      document.getElementById("date").value = currentDate;
      additionalLinksDiv.style.display = "none";
      addMoreLinksBtn.textContent = "Add More Links";
      additionalLinksDiv
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));
      setTimeout(() => {
        formResponse.textContent = "";
      }, 2000);
    })
    .catch((error) => {
      formResponse.textContent =
        "An error occurred while submitting. Please try again.";
    });
});
