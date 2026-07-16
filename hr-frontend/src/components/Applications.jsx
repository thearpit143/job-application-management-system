import '../styles/Applications.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Applications = () => {
  const navigate = useNavigate();

  const candidates = useSelector(store => store.candidates.initialCandidates);

  const handleView = (candidate) => {
    navigate('/hr-dashboard/view-candidate', { state: { candidate, from: 'applications' } });
  };


  return (
    <div className="applications-container">
      <h2>Applications</h2>
      <table className="applications-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>College/University</th>
            <th>Job</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.college}</td>
              <td>{candidate.job}</td>
              <td>{candidate.skills}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.status}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => handleView(candidate)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', color: '#666' }}>
                No candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
