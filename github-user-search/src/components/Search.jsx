// Search.jsx
import { useState } from "react";
import githubService from "../services/githubService";

function Search() {
  const [searchParams, setSearchParams] = useState({
    username: "",
    location: "",
    repos: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  // In Search.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchParams.username) return;

    setIsLoading(true);
    setError(null);
    setPage(1);

    try {
      // 1. Perform initial search
      const searchResult = await githubService.advancedSearch({
        ...searchParams,
        page: 1,
      });

      // 2. Fetch detailed information for each user
      const detailedUsers = await Promise.all(
        searchResult.items.map(async (user) => {
          try {
            const details = await githubService.fetchUserDetails(user.login);
            return {
              ...user,
              location: details.location,
              public_repos: details.public_repos,
              bio: details.bio,
            };
          } catch (error) {
            return { ...user, error: true };
          }
        })
      );

      // 3. Filter out any failed requests
      const validUsers = detailedUsers.filter((user) => !user.error);

      setSearchResults(validUsers);
      setHasMore(searchResult.total_count > searchResult.items.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMore = async () => {
    try {
      const data = await githubService.advancedSearch({
        ...searchParams,
        page: page + 1,
      });
      setSearchResults((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);
      setHasMore(data.total_count > (page + 1) * 30);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded-md  bg-sky-200 text-black"
              placeholder="Enter username"
              value={searchParams.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full p-2 border rounded-md  bg-sky-200 text-black"
              placeholder="Enter location"
              value={searchParams.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Repos
            </label>
            <input
              type="number"
              name="repos"
              className="w-full p-2 border rounded-md  bg-sky-200 text-black"
              placeholder="Minimum repositories"
              value={searchParams.repos}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
        >
          Search Users
        </button>
      </form>

      {isLoading && (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {user.login}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                {user.location && (
                  <p className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {user.location}
                  </p>
                )}
                <p className="mt-1">Repos: {user.public_repos || "N/A"}</p>
              </div>
              <a
                href={user.html_url}
                className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-full text-sm hover:bg-sky-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
