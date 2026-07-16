import '../styles/CandidatePortal.css';
import { useNavigate } from "react-router-dom";

const CandidatePortal = () => {

  const navigate = useNavigate();
  return (
    <section className="candidate-portal-section">
      <div className="candidate-portal-content">
        <h1>Apply for Your Dream Position</h1>
        <p className="candidate-portal-subtitle">
          Discover exciting opportunities and take the next step in your career
        </p>
        <div className="candidate-portal-buttons">
          <button className="primary-button" onClick={()=>navigate('apply-now')}>Apply Now</button>
          <button className="secondary-button" onClick={()=>navigate('track-application')}>Track Your Application</button>
        </div>
      </div>

      <div className="candidate-portal-image">
        <img src='./image1.png' alt="Brand Logo" />
      </div>
    </section>
  );
};

export default CandidatePortal;
