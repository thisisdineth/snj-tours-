// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_7pw54Mvn08KE2RtMe6pnpYxACh3x1P4",
    authDomain: "hellow-bot.firebaseapp.com",
    databaseURL: "https://hellow-bot-default-rtdb.firebaseio.com",
    projectId: "hellow-bot",
    storageBucket: "hellow-bot.firebasestorage.app",
    messagingSenderId: "943687601654",
    appId: "1:943687601654:web:42d93c1a718bb7c6964bd7"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Elements
const form = document.getElementById("reviewSubmitForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const stars = document.getElementById("stars");
const messageInput = document.getElementById("message");
const reviewForm = document.getElementById("reviewForm");
const thankYouMessage = document.getElementById("thankYouMessage");

let selectedRating = 0;

// Handle star rating
stars.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-star")) {
    const starValue = parseInt(event.target.getAttribute("data-value"), 10);
    selectedRating = starValue;

    // Highlight all stars up to the selected one
    const starIcons = stars.querySelectorAll("i");
    starIcons.forEach((icon, index) => {
      if (index < starValue) {
        icon.classList.remove("far");
        icon.classList.add("fas", "selected");
      } else {
        icon.classList.remove("fas", "selected");
        icon.classList.add("far");
      }
    });
  }
});

// Form Submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || selectedRating === 0) {
    alert("Please fill out all required fields and select a rating.");
    return;
  }

  // Check if the email has already submitted a review
  const dbRef = ref(database);
  const existingReview = await get(child(dbRef, `reviews/${email.replace(/\./g, "_")}`));

  if (existingReview.exists()) {
    alert("You have already submitted a review.");
    return;
  }

  // Save the review
  const reviewData = {
    name,
    email,
    rating: selectedRating,
    message,
    submittedAt: new Date().toISOString()
  };

  set(ref(database, `reviews/${email.replace(/\./g, "_")}`), reviewData)
    .then(() => {
      // Show thank you message
      reviewForm.style.display = "none";
      thankYouMessage.style.display = "block";
    })
    .catch((error) => {
      console.error("Error saving review:", error);
      alert("There was an error submitting your review. Please try again.");
    });
});