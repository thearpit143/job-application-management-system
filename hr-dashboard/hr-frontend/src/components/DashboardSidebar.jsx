import '../styles/DashboardSidebar.css';
import { Link, useNavigate } from "react-router-dom";
import { FaChartPie, FaListUl, FaCog, FaUserTimes, FaUserCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { hrAction } from "../store/hrSlice";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(hrAction.logout());
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/hr-dashboard">
          <FaChartPie />
          <span>Overview</span>
        </Link>

        <Link to="/hr-dashboard/applications">
          <FaListUl />
          <span>Applications</span>
        </Link>

        <Link to="/hr-dashboard/approved">
          <FaUserCheck />
          <span>Approved</span>
        </Link>

        <Link to="/hr-dashboard/rejected">
          <FaUserTimes />
          <span>Rejected</span>
        </Link>

        <Link onClick={handleLogout}>
          <FaCog />
          <span>Log Out</span>
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
