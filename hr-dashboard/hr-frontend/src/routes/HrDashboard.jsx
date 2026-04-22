import '../styles/HRDashboard.css';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import FetchCandidateData from '../components/FetchCandidateData';
import LoadingSpinner from '../components/LoadingSpinner';

const HRDashboard = () => {

  const fetchStatus = useSelector(store => store.fetchStatus);

  return (
    <div className="dashboard-wrapper">
      <FetchCandidateData/>
      <DashboardHeader />
      <div className="dashboard-main">
        <DashboardSidebar />
        <div className="dashboard-content">
          {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
