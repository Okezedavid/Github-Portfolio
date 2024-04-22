import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
function Home() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState("Next");
  const [searchTerm, setSearchTerm] = useState(""); // Added for search functionality

  const fetchRepos = () => {
    fetch(
      `https://api.github.com/users/Okezedavid/repos?per_page=6&page=${currentPage}&q=${searchTerm}`
    )
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

  // Filter repositories based on search term
  const filteredUsers = user.filter((userElement) =>
    userElement.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="main-inputs">
        <input
          className="input"
          placeholder="Search repos here..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn">Search</button>
        <br />
        <select className="select-btn">
          <option>Filter by language</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>JAVASCRIPT</option>

        </select>
      </div>
      <section className="repo-container">{userElements}</section>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="prev-btn" onClick={prev}>
            Prev
          </button>
        )}
        <button className="view-more" onClick={viewMore}>
          {showViewMore}
        </button>
      </div>
      {/* Footer */}
      <footer className="foot">
        <div className="social-links">
          <SocialIcon url="https://twitter.com/@DavidOkeze" target="_blank" rel="noopener noreferrer" className="social-icon"/>
          <SocialIcon url="https://linkedin.com/in/david-ugochukwu-7172672b1" target="_blank" rel="noopener noreferrer" className="social-icon" />
        </div>
        <p>© 2024 David's Portfolio.</p>
      </footer>
    </>
  );
}

export default Home;
