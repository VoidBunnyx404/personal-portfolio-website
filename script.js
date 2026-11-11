// =========================================================
// PERSONAL PORTFOLIO WEBSITE - JAVASCRIPT
// JavaScript makes the website interactive.
// =========================================================


// 1. DARK MODE AND LIGHT MODE
// Find the theme button in the HTML.
const themeToggle = document.getElementById("themeToggle");

// Check whether the visitor selected a theme earlier.
const savedTheme = localStorage.getItem("portfolio-theme");

// If Light Mode was saved, turn it on when the page opens.
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

// Show the correct symbol on the theme button.
updateThemeIcon();

// When the visitor clicks the button, switch the theme.
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  // Save the selected theme so it stays the same after refreshing.
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("portfolio-theme", "light");
  } else {
    localStorage.setItem("portfolio-theme", "dark");
  }

  // Update the sun/moon symbol.
  updateThemeIcon();
});

// This function changes the symbol depending on the selected theme.
function updateThemeIcon() {
  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "☀";
  } else {
    themeToggle.textContent = "☾";
  }
}


// 2. MOBILE NAVIGATION MENU
// Find the menu button and the list of navigation links.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open or close the menu when the visitor clicks the menu button.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  // Update the button information for accessibility.
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  // Show an X when the menu is open and a menu symbol when closed.
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close the mobile menu after a visitor selects a section.
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// 3. HIGHLIGHT THE CURRENT NAVIGATION LINK
// Find all the main sections of the website.
const sections = document.querySelectorAll("main section[id]");

// Watch which section is currently visible on the screen.
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Make the matching navigation link active.
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: "-35% 0px -55% 0px"
});

// Start watching each section.
sections.forEach(section => sectionObserver.observe(section));


// 4. CONTACT FORM VALIDATION
// This checks the visitor's name, email and message.
// It only shows a confirmation on the page; it does not send an email.
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

// Run this code when the visitor presses the Send Message button.
contactForm.addEventListener("submit", event => {
  // Stop the browser from refreshing the page.
  event.preventDefault();

  // Read the information entered in the form.
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // This pattern checks whether the email address looks valid.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check that all three fields have been filled in.
  if (!name || !email || !message) {
    formFeedback.style.color = "#f0a35d";
    formFeedback.textContent = "Please fill in all three fields.";
    return;
  }

  // Check that the email address is written correctly.
  if (!emailPattern.test(email)) {
    formFeedback.style.color = "#f0a35d";
    formFeedback.textContent = "Please enter a valid email address.";
    return;
  }

  // Show a success message if all the details are correct.
  formFeedback.style.color = "#5bd69a";
  formFeedback.textContent =
    `Thank you, ${name}! Your details passed the demo validation.`;

  // Clear the form after successful validation.
  contactForm.reset();
});


// 5. AUTOMATICALLY SHOW THE CURRENT YEAR IN THE FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
