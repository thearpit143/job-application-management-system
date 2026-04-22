import '../styles/ViewCandidate.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaLinkedin, FaGlobe, FaGithub, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { candidateAction } from "../store/candidateSlice";
import { fetchStatusAction } from "../store/fetchStatusSlice";

const ViewCandidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const candidate = state?.candidate;
  const from = state?.from || 'applications';

  useEffect(() => {
    if (!candidate) navigate('/hr-dashboard/applications');
  }, [candidate, navigate]);

  if (!candidate) return null;

  const handleClose = () => {
    if (from === 'overview') navigate('/hr-dashboard');
    else navigate('/hr-dashboard/applications');
  };

  // ✅ Approve candidate
  const handleApprove = async () => {
    try {
      dispatch(fetchStatusAction.markFetchingStarted());

      const res = await fetch(`http://localhost:5000/api/candidates/${candidate.id}/approve`, { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        dispatch(candidateAction.approveCandidate({
          payload: data.candidate,
          oldCandidate: candidate
        }));
        toast.success(data.message);
        handleClose();
      } else {
        toast.error(data.error || "Error approving candidate");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while approving");
    } finally {
      dispatch(fetchStatusAction.markFetchingFinished());
    }
  };

  // ✅ Reject candidate
  const handleReject = async () => {
    try {
      dispatch(fetchStatusAction.markFetchingStarted());

      const res = await fetch(`http://localhost:5000/api/candidates/${candidate.id}/reject`, { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        dispatch(candidateAction.rejectCandidate({
          payload: data.candidate,
          oldCandidate: candidate
        }));
        toast.info(data.message);
        handleClose();
      } else {
        toast.error(data.error || "Error rejecting candidate");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while rejecting");
    } finally {
      dispatch(fetchStatusAction.markFetchingFinished());
    }
  };

  const handleViewResume = () => {
    window.open(`http://localhost:5000/api/candidates/${candidate.id}/resume`, '_blank');
  };

  return (
    <div className="view-candidate-overlay">
      <div className="view-candidate-card">
        <button className="close-btn" onClick={handleClose}><FaTimes /></button>

        <h2>{candidate.name}</h2>

        <div className="candidate-details">
          <p><FaEnvelope /> {candidate.email}</p>
          <p><FaPhone /> {candidate.phone}</p>
          <p><FaLinkedin /> <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><FaGlobe /> <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></p>
          <p><FaGithub /> <a href={candidate.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p><strong>City:</strong> {candidate.city}</p>
          <p><strong>College/University:</strong> {candidate.college}</p>
          <p><strong>Graduation Year:</strong> {candidate.graduation_year}</p>
          <p><strong>Job:</strong> {candidate.job}</p>
          <p><strong>Apply Date:</strong> {new Date(candidate.apply_date).toLocaleString()}</p>
          <p><strong>Skills:</strong> {candidate.skills}</p>
          <p><strong>Experience:</strong> {candidate.experience}</p>
          <p><strong>Certifications:</strong> {candidate.certifications}</p>
          <p><strong>Pitch:</strong> {candidate.pitch}</p>
          <p><strong>Status:</strong> {candidate.status}</p>
          <p>
            <strong>Resume:</strong>
            <button className="view-resume-btn" onClick={handleViewResume}>View Resume</button>
          </p>
        </div>

        <div className="candidate-actions">
          <button className="approve-btn" onClick={handleApprove}>Approve</button>
          <button className="reject-btn" onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidate;
