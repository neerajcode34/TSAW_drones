// api.js

const API_ENDPOINT = 'http://localhost:5000'; // replace with your actual API endpoint


export const fetchQuestions = async () => {
  const response = await fetch(`${API_ENDPOINT}/questions`);
  const data = await response.json();
  return data;
};

// Add more functions for authentication, saving responses, etc.
