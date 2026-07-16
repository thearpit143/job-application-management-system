import '../styles/PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="blur-background"></div>
      <div className="not-found-box">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={"/"} className="home-link">Return to Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;