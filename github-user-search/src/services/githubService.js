// githubService.js
import axios from "axios";
// In your githubService.js
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_BASE,
  headers: {
    Authorization: import.meta.env.VITE_GITHUB_API_KEY
      ? `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`
      : undefined,
  },
});

const API_BASE_SEARCH = "https://api.github.com/search/users";
const API_BASE_USER = "https://api.github.com/users";

const buildQueryString = (params) => {
  let query = [];
  if (params.username) query.push(`${params.username} in:login`);
  if (params.location) query.push(`location:${params.location}`);
  if (params.repos) query.push(`repos:>${params.repos}`);
  return query.join("+");
};

// Main search function
const advancedSearch = async (params) => {
  try {
    const response = await axios.get(API_BASE_SEARCH, {
      params: {
        q: buildQueryString(params),
        page: params.page || 1,
        per_page: 30,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Individual user details fetch
const fetchUserDetails = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_USER}/${username}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Common error handler
const handleApiError = (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      throw new Error("API rate limit exceeded. Please try again later.");
    }
    if (error.response.status === 404) {
      throw new Error("No users found matching your criteria");
    }
  }
  throw new Error("Failed to fetch data from GitHub");
};

export default {
  advancedSearch,
  fetchUserDetails,
};
