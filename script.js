/* ============================================================
   Jenkins CI/CD Demo Website - script.js
   ------------------------------------------------------------
   This file adds three simple interactions to the page:
     1. Open / close the navigation menu on mobile.
     2. The "Learn More" button scrolls to the About section.
     3. The contact form shows a success message (no backend).
   ============================================================ */

/* We wait until the HTML is fully loaded, otherwise the elements
   we look for below would not exist yet. */
document.addEventListener("DOMContentLoaded", function () {

  /* ----------------------------------------------------------
     1. MOBILE NAVIGATION MENU
     ---------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var navLinks = document.querySelectorAll(".nav-link");

  // Show or hide the menu when the hamburger button is clicked.
  navToggle.addEventListener("click", function () {
    var isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    // Tell screen readers whether the menu is open or closed.
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after a link is clicked and highlight that link.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");

      navLinks.forEach(function (otherLink) {
        otherLink.classList.remove("active");
      });
      link.classList.add("active");
    });
  });

  /* ----------------------------------------------------------
     2. "LEARN MORE" BUTTON -> SCROLL TO THE ABOUT SECTION
     ---------------------------------------------------------- */
  var learnMoreBtn = document.getElementById("learnMoreBtn");
  var aboutSection = document.getElementById("about");

  learnMoreBtn.addEventListener("click", function () {
    // scrollIntoView with behavior "smooth" gives a nice animated scroll.
    aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ----------------------------------------------------------
     3. CONTACT FORM
     ---------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  var formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function (event) {
    // Stop the browser from reloading the page (its normal behaviour).
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    // Simple check: every field must be filled in.
    if (name === "" || email === "" || message === "") {
      showMessage("Please fill in every field before submitting.", "error");
      return;
    }

    // No backend, so we just show a friendly success message.
    showMessage("Thank you, " + name + "! Your message has been sent successfully.", "success");

    // Clear the form so the user can write another message.
    form.reset();
  });

  // Small helper that puts text into the message paragraph.
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type; // "success" or "error"
  }

  /* ----------------------------------------------------------
     4. FOOTER YEAR
     ---------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

});
