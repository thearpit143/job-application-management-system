import '../styles/RejectedCandidates.css';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const RejectedCandidates = () => {

  const rejectedCandidates = useSelector(store => store.candidates.rejectedCandidates);
  const fetchStatus = useSelector(store => store.fetchStatus);

  if (fetchStatus.currentlyFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="rejected-container">
      <h2>Rejected Candidates</h2>
      <table className="rejected-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>College/University</th>
            <th>Job</th>
            <th>Experience</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rejectedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.college}</td>
              <td>{candidate.job}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.status}</td>
            </tr>
          ))}
          {rejectedCandidates.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: '#666' }}>
                No rejected candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RejectedCandidates;
