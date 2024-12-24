// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, onValue, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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
const emailList = document.getElementById("emailList");
const reviewsContainer = document.getElementById("reviewsContainer");

// Fetch and Display Emails
const subscriptionRef = ref(database, "subscriptions");
onValue(subscriptionRef, (snapshot) => {
  const data = snapshot.val();
  emailList.innerHTML = ""; // Clear previous list

  if (data) {
    Object.values(data).forEach((subscription) => {
      const email = subscription.email;

      // Create email item
      const emailItem = document.createElement("div");
      emailItem.className = "email-item";

      const emailAddress = document.createElement("div");
      emailAddress.className = "email-address";
      emailAddress.textContent = email;

      const mailtoButton = document.createElement("a");
      mailtoButton.className = "mailto-btn";
      mailtoButton.href = `mailto:${email}`;
      mailtoButton.textContent = "Send Email";

      emailItem.appendChild(emailAddress);
      emailItem.appendChild(mailtoButton);

      emailList.appendChild(emailItem);
    });
  } else {
    emailList.innerHTML = "<p>No subscribed emails found.</p>";
  }
});

// Fetch and Display Reviews
async function fetchReviews() {
  const dbRef = ref(database);
  const reviewsSnapshot = await get(child(dbRef, 'reviews'));

  if (reviewsSnapshot.exists()) {
    const reviews = reviewsSnapshot.val();
    const sortedReviews = Object.values(reviews).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    sortedReviews.forEach(review => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");

      reviewElement.innerHTML = `
        <h3>${review.name}</h3>
        <div class="stars">${generateStars(review.rating)}</div>
        <p>${review.message || "No comment provided."}</p>
        <p><a href="mailto:${review.email}">${review.email}</a></p>
      `;

      reviewsContainer.appendChild(reviewElement);
    });
  } else {
    reviewsContainer.innerHTML = "<p>No reviews available yet.</p>";
  }
}

// Generate Stars
function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
  }
  return stars;
}

// Load Reviews on Page Load
fetchReviews();
