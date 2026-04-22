import '../styles/HrLogin.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { hrAction } from '../store/hrSlice';

const HrLogin = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/hr/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch(
        hrAction.loginSuccess({
          token: res.data.token,
          name: res.data.hr.name,
        })
      );

      navigate("/hr-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-left">
          <img src={'./image.png'} alt="" className='login-logo-icon'/>
          <h1 className="company-name">Colored Cow</h1>
          <h6 className='company-tagline'>
            Connecting talent with opportunity — one login at a time.
          </h6>
        </div>

        <div className="login-right">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Username:
              <input 
                placeholder="Username" 
                required 
                ref={usernameRef}
              />
            </label>

            <label>
              Password:
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                ref={passwordRef}
              />
            </label>

            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="bottom-note">
            Forgot Password? <a href="#">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HrLogin;
