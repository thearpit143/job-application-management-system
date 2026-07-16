import "../styles/FormSubmissionMessage.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const FormSubmissionMessage = ({ success}) => {

  const navigate = useNavigate();
  return (
    <div className="form-message-container">
      {success ? (
        <div className="form-message success">
          <FaCheckCircle className="icon" />
          <h2>Form Submitted Successfully!</h2>
          <p>Thank you for applying. We’ll get back to you soon.</p>
          <div className="button-group">
            <button className="btn" onClick={() => navigate('/')}>
              Go to Home
            </button>
            <button className="btn secondary" onClick={() => navigate('/feedback')}>
              Give Feedback
            </button>
          </div>
        </div>
      ) : (
        <div className="form-message error">
          <FaTimesCircle className="icon" />
          <h2>Form Submission Failed!</h2>
          <p>Something went wrong. Please try again.</p>
          <div className="button-group">
            <button className="btn" onClick={() => navigate('/')}>
              Go To Home and Re-apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionMessage;
