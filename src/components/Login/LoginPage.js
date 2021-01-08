import { Link } from 'react-router-dom';

const LoginPage = () => (
  <nav className="login-page">
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

export default LoginPage;
