const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyDGqCH0lB5qZjs8tSxveNzU0fhE570N3jM";

// Memory about MCICTS
const CLUB_MEMORY = `
Mahanama College Information & Communication Technology Society (MCICTS)

Established on the 29th of September, 2012, the Mahanama College Information & Communication Technology Society (MCICTS) has been a beacon of excellence, guiding students of Mahanama College toward international standards in ICT. Over the years, MCICTS has evolved into a cornerstone of the school community, inspiring countless students by opening doors to excel in the dynamic field of Information and Communication Technology.

Our Vision and Mission

At MCICTS, we are united by a shared mission: to nurture standout leaders in the ICT arena who will bring pride to Mother Mahanama and our nation. We aim to provide opportunities that spark creativity, enhance skills, and inspire a lifelong passion for technology.

Membership Opportunities

Are you a Mahanamian above Grade 6? You can become part of this thriving community by registering on our official website at register.mcicts.lk. Once a member, you gain access to an array of exciting opportunities:

	•	Morning ICT Classes: Learn to create your own website, explore graphic design, delve into programming, and much more.
	•	Skill Development and Leadership: Build leadership qualities and excel in teamwork.
	•	Competitions: Represent Mahanama College at prestigious national-level ICT competitions.
	•	Exclusive Programs: Take part in workshops, projects, and initiatives designed to enhance your ICT knowledge and skills.

2024/2025 Official Committee

Our society thrives under the guidance of dedicated student leaders. We are proud to introduce the 2024/2025 Official Executive and General Committees of MCICTS:

	•	President: Yewan Ladduwahetty
	•	Vice President: Kavishka Manohara
	•	Secretary: Dulina Nethula
	•	Vice Secretary: Risandu Chathmin
	•	Treasurer: Minil Bometh
	•	Director of Operations: Dineth Gunawardhana
  •	Master In charge: Mr. Tharusha Perera (ICT teacher in school)

Why Join MCICTS?

MCICTS is more than just a society; it’s a platform to unlock your potential. With us, you can:

	•	Explore the vast landscape of ICT.
	•	Develop technical and creative skills in a supportive environment.
	•	Collaborate with peers and mentors who share your passion for technology.
	•	Be part of a legacy that shapes future leaders and innovators.

Join us today and take the first step in your journey to becoming an ICT trailblazer. Let’s innovate, inspire, and make Mahanama College proud!
 
How to join to whatsapp group ? send message to Director Of operations then he will add you to the whatsapp group 
official website : www.mcicts.lk
When will the morning class programmer start ? next januray (2025) We will inform you the starting date correctly through our social media follow us on Instgarm , X , (mcicts)

If you need any more informations contact us 0701840527(Dineth Gunawardana - Director of Operations) 

`;

// DOM Elements
const chatWidget = document.getElementById("chat-widget");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const openChat = document.getElementById("open-chat");
const closeChat = document.getElementById("close-chat");

// Open Chat Widget
openChat.addEventListener("click", () => {
  chatWidget.style.display = "flex";
  openChat.style.display = "none";
});

// Close Chat Widget
closeChat.addEventListener("click", () => {
  chatWidget.style.display = "none";
  openChat.style.display = "block";
});

// Add Message to Chat
const addMessage = (content, sender) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
};

// Fetch Response from API
const fetchResponse = async (message) => {
  try {
    const prompt = `
You are an AI assistant answering questions specifically about the Mahanama College ICT Society (MCICTS).
Use the following memory for reference when answering questions:
${CLUB_MEMORY}

User: ${message}
AI:
    `;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          role: "user", 
          parts: [{ text: prompt }] 
        }] 
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    return data?.candidates[0]?.content?.parts[0]?.text || "No response.";
  } catch (error) {
    console.error(error);
    return "Sorry, something went wrong. Please try again later.";
  }
};

// Handle Sample Question Click
chatMessages.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion")) {
    const message = e.target.textContent.trim();
    addMessage(message, "user");
    handleBotResponse(message);
  }
});

// Handle Message Submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  userInput.value = "";
  handleBotResponse(userMessage);
});

// Handle Bot Response
const handleBotResponse = async (message) => {
  addMessage("Typing...", "bot");
  const botMessage = await fetchResponse(message);
  chatMessages.lastChild.textContent = botMessage;
};
