(function () {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("Contact form not found!");
    return;
  }

  const submitButton = form.querySelector("[data-form-btn]");
  if (!submitButton) {
    console.error("Submit button not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable submit button while sending
    submitButton.setAttribute("disabled", "true");
    submitButton.innerHTML =
      '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

    // Get form data
    const nameInput = form.querySelector('[name="user_name"]');
    const emailInput = form.querySelector('[name="user_email"]');
    const messageInput = form.querySelector('[name="message"]');

    if (!nameInput || !emailInput || !messageInput) {
      console.error("Form inputs not found!");
      return;
    }

    const formData = {
      title: "New Message from Contact Form",
      user_name: nameInput.value,
      user_email: emailInput.value,
      message: messageInput.value,
      time: new Date().toLocaleString(),
    };

    // Send email using EmailJS
    if (typeof emailjs === "undefined") {
      console.error("EmailJS is not loaded!");
      alert("Failed to send message. Please try again later.");
      return;
    }

    emailjs
      .send("service_lh8rv4s", "template_v7v0kqe", formData)
      .then(function () {
        // Show success message
        alert("Message sent successfully!");
        form.reset();
      })
      .catch(function (error) {
        // Show error message
        alert("Failed to send message. Please try again.");
        console.error("Error:", error);
      })
      .finally(function () {
        // Re-enable submit button
        submitButton.removeAttribute("disabled");
        submitButton.innerHTML =
          '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      });
  });
})();
