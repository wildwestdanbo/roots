document.addEventListener("DOMContentLoaded", function() {
  const chatLog = document.getElementById("chat-log");
  const userMessageInput = document.getElementById("user-message");
  const aggressiveModeButton = document.getElementById("aggressive-mode");

  let isAggressiveMode = false;

  function addMessageToChatLog(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (sender === "User") {
      messageElement.textContent = sender + ": " + message;
    } else if (sender === "Bot") {
      messageElement.classList.add("bot-message");
      messageElement.textContent = sender + ": " + message;
    }
    chatLog.appendChild(messageElement);
    chatLog.appendChild(document.createElement("br"));
  }

  function handleUserMessage() {
    const userMessage = userMessageInput.value.trim();
    if (userMessage !== "") {
      addMessageToChatLog(userMessage, "User");
      setTimeout(function() {
        let botResponse;
        if (isAggressiveMode) {
          botResponse = generateAggressiveBotResponse();
        } else {
          botResponse = generateBotResponse();
        }
        addMessageToChatLog(botResponse, "Bot");
      }, 1000);
      userMessageInput.value = "";
    }
  }

  function generateBotResponse() {
    makeApiCall();
    const randomResponses = [
      "I understand.",
      "Tell me more.",
      "How does that make you feel?",
      "Have you tried seeking professional help?",
      "Take it one day at a time.",
      "Stay strong and stay focused.",
      "You are not alone in this journey."
    ];
    const randomIndex = Math.floor(Math.random() * randomResponses.length);
    return randomResponses[randomIndex];
  }

  function generateAggressiveBotResponse() {
    const aggressiveResponses = [
      "“Believe you can, and you’re halfway there.” – Theodore Roosevelt",
      "“Success is the sum of small efforts, repeated day in and day out.” – Robert Collier",
      "“Either you run the day, or the day runs you.” – Jim Rohn",
      "“All the suffering, stress, and addiction comes from not realizing you already are what you are looking for. “– Jon Kabat-Zinn",
      "“The most common way people give up their power is by thinking they don’t have any.” – Alice Walker"
    ];
    const randomIndex = Math.floor(Math.random() * aggressiveResponses.length);
    return aggressiveResponses[randomIndex];
  }

  userMessageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      handleUserMessage();
    }
  });

  aggressiveModeButton.addEventListener("click", function() {
    isAggressiveMode = aggressiveModeButton.checked;
  });

  function makeApiCall() {
    const url = "https://us-central1-aiplatform.googleapis.com/v1/projects/tactile-sentry-398819/locations/us-central1/publishers/google/models/text-bison@001:predict";
    const headers = {
      "Authorization": "Bearer ya29.a0AfB_byBeZSjNwwMGEDAZEXRONelZftRE106US8xu5rKVTtUoy3IkRoE08XOZkV4hD-Xp1YBwkTquBw5NHaOMwP2KB_dy9oLA17P1WSLtct4JObIqoKL67IYllmHWvznY-Y9Wa99U8mNz0zJPoz0ECpBAzfJq86TpgghOVCQ4cYmbLicHgxOHzQGX8qmvSoBTgja9h0PPtPBqnefe2Qktzpx5_legLQDHARow8LLJNBbNghRNOoHFVRu7FvlVeScWaX0S1JkXSmdCYYED_6xFsWVNdpFJbu1Gcgmbu_Fo0c6BXWM4V9oCzP5YMQJ1clvQLOcZWvl6gZwOj73PGoOd-AlBZGr9ILybbsGnO1LZt03VolpN90t1PqXRHMAGS7QZ8C5AmaJOB7_V2czLOObPyHAoDAISaCgYKAQ0SARESFQGOcNnCcwXRW5wLzP-SHGhwrknu2A0419",
      "Content-Type": "application/json"
    };
    const data = {
      "instances": [
        {
          "content": "What are some strategies for overcoming writer's block:"
        }
      ],
      "parameters": {
        "candidateCount": 1,
        "maxOutputTokens": 1024,
        "temperature": 0.2,
        "topP": 0.8,
        "topK": 1
      }
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
