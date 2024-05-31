import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { SocialIcon } from "react-social-icons";
import Paginate from "./Paginate";
import Skeleton from "./Skeleton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState("Next");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state

  const perPage = 6;

  const fetchRepos = () => {
    const apiUrl = `https://api.github.com/users/Okezedavid/repos`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setTotalPages(Math.ceil(data.length / perPage));
        setLoading(false); // Set loading to false when data is fetched
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  useEffect(() => {
    if (currentPage >= totalPages) {
      setShowViewMore("No more Repos");
    } else {
      setShowViewMore("Next");
    }
  }, [currentPage, totalPages]);

  const viewMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
  };

  const filteredRepos = repos.filter((repo) => {
    const matchesSearchTerm = repo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage ? repo.language === selectedLanguage : true;
    return matchesSearchTerm && matchesLanguage;
  });

  const displayedRepos = filteredRepos.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <div className="welcomeMessage">
        <h2>
          Heyy!👋 <span className="welcome">Welcome</span>
        </h2>
      </div>
      <div className="main-inputs">
        <input
          className="input"
          placeholder="Search repos here..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="select-btn" onChange={(e) => handleLanguageFilter(e.target.value)}>
          <option value="">Filter</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Vue">Vue</option>
          <option value="Typescript">Typescript</option>
        </select>
      </div>
      <div className="repoTitle">
        <h1>My Repositories</h1>
      </div>
      <section className="repo-container">
        {loading ? ( // Conditionally render Skeleton while loading
          Array.from({ length: perPage }).map((_, index) => <Skeleton key={index} />)
        ) : (
          displayedRepos.map((repo) => (
            <div className="repo-card" key={repo.id}>
              <Link to={`/repodetails/${repo.name}`}>
                <h2 className="repo-name">{repo.name}</h2>
              </Link>
              <p className="language">Language: {repo.language || "none"}</p>
              <p className="date">Start date & time: {new Date(repo.created_at).toLocaleString()}</p>
              <p className="visibility">Visibility: {repo.visibility}</p>
            </div>
          ))
        )}
      </section>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="prev-btn" onClick={prev}>
            <FontAwesomeIcon icon={faArrowLeft} /> 
          </button>
        )}
        <Paginate currentPage={currentPage} />
        {currentPage < totalPages && (
          <button className="view-more" onClick={viewMore}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
      <footer className="foot">
       
    <div class="social-links">
      <a href="https://twitter.com/@DavidOkeze" target="_blank" rel="noopener noreferrer">
  <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M24 4.56c-.89.39-1.84.66-2.84.78a4.92 4.92 0 002.16-2.72 9.84 9.84 0 01-3.1 1.18 4.92 4.92 0 00-8.38 4.48A13.93 13.93 0 011.67 3.15 4.93 4.93 0 003.18 9.72a4.91 4.91 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83 4.92 4.92 0 01-2.22.08 4.93 4.93 0 004.59 3.42A9.87 9.87 0 010 21.54a13.91 13.91 0 007.55 2.21c9.06 0 14.01-7.5 14.01-14 0-.21 0-.43-.02-.64a10.01 10.01 0 002.47-2.54z"/>
  </svg>
</a>

      <a href="https://linkedin.com/in/david-ugochukwu-7172672b1" target="_blank" rel="noopener noreferrer">
  <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M22.23 0H1.77A1.76 1.76 0 000 1.76v20.48A1.76 1.76 0 001.77 24h20.48A1.76 1.76 0 0024 22.24V1.76A1.76 1.76 0 0022.23 0zM7.12 20.45H3.54V9h3.58v11.45zM5.33 7.62a2.07 2.07 0 01-2.1-2.08 2.08 2.08 0 112.1 2.08zm14.72 12.83h-3.58v-5.5c0-1.31-.02-3-1.82-3s-2.1 1.42-2.1 2.91v5.59H9.97V9h3.43v1.56h.05a3.77 3.77 0 013.39-1.87c3.62 0 4.29 2.38 4.29 5.47v6.29z"/>
  </svg>
</a>
    </div>
        <p>© 2024 David's Portfolio.</p>
      </footer>
    </>
  );
}

export default Home;
