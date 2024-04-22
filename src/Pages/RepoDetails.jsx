import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegStar, FaRegEye, FaCodeBranch } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';

function MyRepoDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [branch, setBranch] = useState({});
  const [deployment, setDeployment] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/repos/Okezedavid/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/repos/Okezedavid/${id}/branches`)
      .then((response) => response.json())
      .then((data) => {
        setBranch(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/repos/Okezedavid/${id}/deployments`)
      .then((response) => response.json())
      .then((data) => {
        setDeployment(data);
      });
  }, []);

  return (
    <div id="repodetail">
      <div className="repodetail-card">
        <h2 className="repo-name">{details.name}</h2>
        <div className="repo-mini-details">
          <p><FaRegStar className="icons" /> Stars: {details.stargazers_count}</p>
          <p><FaRegEye className="icons" /> Watch: {details.watchers}</p>
          <p><TbGitFork className="icons" /> Forks: {details.forks}</p>
          <p><FaCodeBranch className="icons" /> Branches: {branch.length}</p>
        </div>
        <p>Main Language: {details.language === null ? 'none' : details.language}</p>
        <p>
          Live site: {deployment.length === 0 ? 'none' : <a href={`https://Okezedavid.github.io/${details.name}`}>Okezedavid.github.io/{details.name}</a>}
        </p>
        <p>
          <a href={`https://github.com/${details.full_name}`} target="_blank" rel="noopener noreferrer">
            View on Github
          </a>
        </p>
        <Link to="/">
          <button className="home-button">Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default MyRepoDetails;
