import '../styles/Overview.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserTimes, FaUserCheck, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Overview = () => {
  const navigate = useNavigate();

  // Correctly access the separated candidate arrays
  const { initialCandidates, approvedCandidates, rejectedCandidates } = useSelector(store => store.candidates);

  // Calculate totals directly from the separated arrays
  const totalPending = initialCandidates.length;
  const totalApproved = approvedCandidates.length;
  const totalRejected = rejectedCandidates.length;

  // Only show pending candidates in the "Latest Candidates" table
  const latestCandidates = initialCandidates.slice(0, 5);

  const handleView = (candidate) => {
    navigate('/hr-dashboard/view-candidate', { state: { candidate, from: 'overview' } });
  };

  return (
    <div className="overview-container">
      <div className="metrics-container">
        <Link to={'applications'}>
          <div className="metric-card">
            <h3><FaUsers className="metric-icon" /> Pending Applications</h3>
            <span>{totalPending}</span>
          </div>
        </Link>

        <Link to={'approved'}>
          <div className="metric-card">
            <h3><FaUserCheck className="metric-icon" /> Approved Applications</h3>
            <span>{totalApproved}</span>
          </div>
        </Link>

        <Link to={'rejected'}>
          <div className="metric-card">
            <h3><FaUserTimes className="metric-icon" /> Rejected Applications</h3>
            <span>{totalRejected}</span>
          </div>
        </Link>
      </div>

      <div className="recent-activity">
        <div className="section-header">
          <h2>Latest Pending Candidates</h2>
          <Link to={'applications'} className="view-all">View All</Link>
        </div>
        <div className="activity-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>College/University</th>
                <th>Job</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {latestCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.college}</td>
                  <td>{candidate.job}</td>
                  <td>{candidate.skills}</td>
                  <td>{candidate.experience}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleView(candidate)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {latestCandidates.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#666' }}>
                    No pending candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;