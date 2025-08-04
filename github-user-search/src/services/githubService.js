import axios from "axios";
const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const fetchUserData = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    method: 'GET'
    headers: {
      Authorization: `token ${apiKey}`
    }
  });
  return res.json();
};
