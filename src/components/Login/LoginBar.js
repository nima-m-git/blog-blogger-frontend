import { Link } from 'react-router-dom';

const LoginBar = () => (
  <nav className="login-bar">
    <div className="login-links">
      <Link to="/login">
        <div className="link">Login</div>
      </Link>
      <Link to="/signup">
        <div className="link"> Signup</div>
      </Link>
    </div>
  </nav>
);

export default LoginBar;
