 document.getElementById('predictionForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let query = document.getElementById('query').value;
  let url = "https://us-central1-aiplatform.googleapis.com/v1/projects/tactile-sentry-398819/locations/us-central1/publishers/google/models/chat-bison@001:predict";
  let headers = {
    "Authorization": "Bearer " + "your_token_here",
    "Content-Type": "application/json"
  };
  let body = {
    "instances": [
      {
        "context": query,
        "examples": [],
        "messages": []
      }
    ],
    "parameters": {
      "candidateCount": 1,
      "maxOutputTokens": 256,
      "temperature": 0.2,
      "topP": 0.8,
      "topK": 40
    }
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('prediction').innerText = data.predictions[0];
  })
  .catch(error => console.error('Error:', error));
});
