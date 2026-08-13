/* =============================
   🎉 RSVP Modal + Theme Scripts
   ============================= */

// 🌗 Theme Toggle Setup
const themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "Light Mode";
  } else {
    themeButton.textContent = "Dark Mode";
  }
  themeButton.addEventListener("click", toggleDarkMode);
});

// 🧾 RSVP Modal Setup
const rsvpForm = document.getElementById("rsvp-form");
const rsvpList = document.getElementById("rsvp-list");
const rsvpCount = document.getElementById("rsvp-count");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const modal = document.getElementById("rsvp-modal");
const modalMsg = document.getElementById("modal-message");
const closeBtn = document.getElementById("close-modal");
const img = document.querySelector(".modal-img");
const motionToggle = document.getElementById("motion-toggle");
let reduceMotion = false;

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|hotmail)\.(com|org|edu|gov)$/.test(email);

const resetErrors = () => {
  [nameInput, emailInput].forEach(input => {
    input.classList.remove("error", "valid");
    input.style.backgroundColor = "";
    input.style.borderColor = "";
    input.style.color = "";
  });
};

// 🌟 Default Guest List
const defaultGuests = ["River Phoenix", "Aria Nova", "Leo Vega"];
defaultGuests.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  rsvpList.appendChild(li);
});
rsvpCount.innerText = `Total RSVPs: ${defaultGuests.length}`;

// 📨 RSVP Submit Logic
rsvpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const location = document.getElementById("location").value.trim();
  const division = document.getElementById("division").value;

  resetErrors();
  let valid = true;

  if (name.length < 2) {
    nameInput.classList.add("error");
    nameInput.style.backgroundColor = "#ff4d4d";
    nameInput.style.borderColor = "#ff0000";
    nameInput.style.color = "white";
    valid = false;
  } else {
    nameInput.classList.add("valid");
  }

  if (!isValidEmail(email)) {
    emailInput.classList.add("error");
    emailInput.style.backgroundColor = "#ff4d4d";
    emailInput.style.borderColor = "#ff0000";
    emailInput.style.color = "white";
    valid = false;
  } else {
    emailInput.classList.add("valid");
  }

  if (!location || !division) {
    valid = false;
  }

  if (!valid) {
    alert("⚠️ Please enter a valid name, email, location, and division.");
    return;
  }

  const greeting = `🌟 Welcome, ${name} from ${location}! You’ve joined the ${division} Division.`;
  document.getElementById("greeting").textContent = greeting;

  const listItem = document.createElement("li");
  listItem.textContent = name;
  rsvpList.appendChild(listItem);
  rsvpCount.textContent = `Total RSVPs: ${rsvpList.children.length}`;

  modalMsg.textContent = `Thanks for RSVPing, ${name} from ${location}! You're signed up for the ${division} division. 🌍🚀`;

  if (!reduceMotion) {
    modal.classList.remove("hidden");
    img.style.transform = "scale(0.5) rotate(0deg)";
    img.style.transition = "transform 0.6s ease";
    setTimeout(() => {
      img.style.transform = "scale(1) rotate(360deg)";
    }, 10);
    setTimeout(() => modal.classList.add("hidden"), 4000);
  }

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  rsvpForm.reset();
});

// ✖ Close Modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// 🎛 Reduce Motion Toggle
motionToggle.addEventListener("click", () => {
  reduceMotion = !reduceMotion;
  document.body.classList.toggle("reduce-motion", reduceMotion);
  motionToggle.textContent = reduceMotion ? "Enable Motion" : "Reduce Motion";
});
