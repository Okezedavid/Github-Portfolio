import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
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
