import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate(); // Hook to navigate programmatically
    console.error(error);

    // Function to handle click event on the button
    const goToHomePage = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="error-status">{error.status}</p>
            <p className="error-status-text"><i>{error.statusText}</i></p>
            {/* Button to navigate to the home page */}
            <button onClick={goToHomePage} className='home-button'><b>Go to Home Page</b></button>
        </div>
    );
}

export default ErrorPage;
