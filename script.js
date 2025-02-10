// Set the current date in the hidden date field
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = currentDate;
});

const addMoreLinksBtn = document.querySelector(".add-more-links");
const additionalLinksDiv = document.querySelector(".additional-links");
const form = document.getElementById("contactForm");

// Toggle additional social links section
addMoreLinksBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default button behavior

  if (
    additionalLinksDiv.style.display === "none" ||
    additionalLinksDiv.style.display === ""
  ) {
    additionalLinksDiv.style.display = "flex";
    addMoreLinksBtn.textContent = "Remove Links";
  } else {
    additionalLinksDiv.style.display = "none";
    addMoreLinksBtn.textContent = "Add More Links";

    // Clear input values when hiding
    additionalLinksDiv
      .querySelectorAll("input")
      .forEach((input) => (input.value = ""));
  }
});

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Show a loading message
  const formResponse = document.getElementById("formResponse");
  formResponse.textContent = "Submitting your response, please wait...";

  // Gather form data
  const formData = new FormData(this);

  // Send data to Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbzyK27uHjVUMiREXn5xIu3i0CPGayPNsv0OInpZ46K3yKAi8gm2YuabLl2K284WiBw/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      // Display a success message
      formResponse.textContent =
        "Thank you! Your submission has been received.";

      // Reset the form fields
      form.reset();

      // Reset the date field with the current date
      const currentDate = new Date().toISOString().split("T")[0];
      document.getElementById("date").value = currentDate;

      // Hide additional social links section & reset inputs
      additionalLinksDiv.style.display = "none";
      addMoreLinksBtn.textContent = "Add More Links";
      additionalLinksDiv
        .querySelectorAll("input")
        .forEach((input) => (input.value = ""));

      // Clear message after 2 seconds
      setTimeout(() => {
        formResponse.textContent = "";
      }, 2000);
    })
    .catch((error) => {
      // Display an error message
      formResponse.textContent =
        "An error occurred while submitting. Please try again.";
    });
});
