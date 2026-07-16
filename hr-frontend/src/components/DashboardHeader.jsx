import "../styles/DashboardHeader.css";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const name = useSelector((state) => state.hr?.name);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="header-title">HR Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <span className="user-name">
          Welcome, {name || "HR"}
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;
