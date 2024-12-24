// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
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

// Reference to the subscription data
const subscriptionRef = ref(database, "subscriptions");

// Fetch and display emails
const emailList = document.getElementById("emailList");

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

