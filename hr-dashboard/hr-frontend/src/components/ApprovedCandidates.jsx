import '../styles/ApprovedCandidates.css';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const ApprovedCandidates = () => {

  const approvedCandidates = useSelector(store => store.candidates.approvedCandidates);
  const fetchStatus = useSelector(store => store.fetchStatus);

  if (fetchStatus.currentlyFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="approved-container">
      <h2>Approved Candidates</h2>
      <table className="approved-table">
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
          {approvedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.college}</td>
              <td>{candidate.job}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.status}</td>
            </tr>
          ))}
          {approvedCandidates.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: '#666' }}>
                No approved candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedCandidates;
