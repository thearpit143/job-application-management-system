import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import '../styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;