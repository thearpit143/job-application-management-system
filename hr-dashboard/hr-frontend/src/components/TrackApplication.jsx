import "../styles/TrackApplication.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const TrackApplication = () => {
  const emailRef = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    setLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/track?email=${email}`);
      const data = await res.json();
      setLoading(false);

      if (!data.name && data.status === "Not Found") {
        setStatusMessage("⚠️ No application found with this email.");
        return;
      }

      const name = data.name || "Candidate";

      switch (data.status) {
        case "Approved":
          setStatusMessage(`✅ Hey ${name}, your application has been approved!`);
          break;
        case "Rejected":
          setStatusMessage(`❌ Hey ${name}, your application has been rejected.`);
          break;
        case "Pending":
          setStatusMessage(`⏳ Hey ${name}, your application is pending.`);
          break;
        default:
          setStatusMessage("⚠️ No application found with this email.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStatusMessage("⚠️ Something went wrong. Try again later.");
    }
  };

  const handleTrackAnother = () => {
    setStatusMessage("");
    setFormKey(prev => prev + 1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="track-container">
      {loading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}

      <div className="track-card">
        {!statusMessage && (
          <>
            <h2>Track Your Application</h2>
            <form key={formKey} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
              <button type="submit" disabled={loading}>
                Check Status
              </button>
            </form>
          </>
        )}

        {statusMessage && (
          <>
            <p className="status-message">{statusMessage}</p>
            <div className="track-buttons">
              <button type="button" onClick={handleTrackAnother}>
                Track Another Application
              </button>
              <button type="button" onClick={handleGoHome}>
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackApplication;
