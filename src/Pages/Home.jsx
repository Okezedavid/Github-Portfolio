import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import Paginate from "./Paginate"

function Home() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState("Next");
  const [searchTerm, setSearchTerm] = useState(""); // Added for search functionality

  const fetchRepos = () => {
    const apiUrl = `https://api.github.com/users/Okezedavid/repos?per_page=6&page=${currentPage}&q=${searchTerm}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setShowViewMore("No more Repos");
        } else {
          // Always replace the user data with new data
          setUser(data);
          setShowViewMore("Next");
        }
      });
  };

  useEffect(() => {
    fetchRepos();
  }, [currentPage, searchTerm]); // Add searchTerm as a dependency here

  const viewMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    // Ensure we don't go below page 1
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle language filter change
  const handleLanguageFilter = (selectedLanguage) => {
    setSearchTerm(selectedLanguage);
    setCurrentPage(1); // Reset page when changing the filter
  };

  // Filter repositories based on search term
  const filteredUsers = user.filter((userElement) => {
    if (!searchTerm) {
      // No search term entered, show all repositories
      return true;
    }
    // Show repositories whose names match the search term
    return userElement.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const userElements = filteredUsers.map((userElement) => {
    return (
      <div className="repo-card" key={userElement.id}>
        <Link to={`/repodetails/${userElement.name}`}>
          <h2 className="repo-name">{userElement.name}</h2>
        </Link>
        <p className="language">
          Language:{" "}
          {userElement.language === null ? "none" : userElement.language}
        </p>
        <p className="date">Start date & time: {userElement.created_at}</p>
        <p className="visibility">Visibility: {userElement.visibility}</p>
      </div>
    );
  });

  return (
    <>
      <div className="welcomeMessage">
        <h2>
          Heyy!👋 <span className="welcome">Welcome</span>
        </h2>
      </div>
      <div className="main-inputs">
        {/* Search input */}
        <input
          className="input"
          placeholder="Search repos here..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Language filter dropdown */}
        <select
          className="select-btn"
          onChange={(e) => handleLanguageFilter(e.target.value)}
        >
          <option value="">Filter</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>

      <div className="repoTitle">
        <h1>My Repositories</h1>
      </div>

      {/* Display repositories */}
      <section className="repo-container">{userElements}</section>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button className="prev-btn" onClick={prev}>
            Prev
          </button>
        )}
        <Paginate currentPage={currentPage} />
        <button
  className="view-more"
  onClick={viewMore}
  disabled={showViewMore === "No more Repos"}
>
  {showViewMore}
</button>

      </div>

      {/* Footer */}
      <footer className="foot">
        <div className="social-links">
          <SocialIcon
            url="https://twitter.com/@DavidOkeze"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          />
          <SocialIcon
            url="https://linkedin.com/in/david-ugochukwu-7172672b1"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          />
        </div>
        <p>© 2024 David's Portfolio.</p>
      </footer>
    </>
  );
}

export default Home;
