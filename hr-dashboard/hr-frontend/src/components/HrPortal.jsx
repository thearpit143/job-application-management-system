import '../styles/HrPortal.css';
import { FaUserTie, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HrPortal = () => {

  const navigate = useNavigate();
  
  return (
    <section className="hr-portal-section">
      <div className="portal-card">
        <div className="portal-left">
          <h2>HR Portal</h2>
          <p>Powerful tools for your hiring needs</p>
        </div>
        <div className="portal-right">
          <h3>Manage Candidates Efficiently</h3>
          <ul>
            <li>Review applications</li>
            <li>Schedule interviews</li>
            <li>Collaborate with your team</li>
          </ul>

          <div className="portal-icons">
            <div className="icon-circle">
              <FaUserTie size={24} />
            </div>
            <div className="icon-circle">
              <FaChartLine size={24} />
            </div>
          </div>

          <button className="login-button" onClick={()=>navigate('/hr-login')}>HR Login</button>
        </div>
      </div>
    </section>
  );
};

export default HrPortal;
