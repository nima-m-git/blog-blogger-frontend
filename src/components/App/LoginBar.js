import { Link } from 'react-router-dom';

import './LoginBar.scss';

const LoginBar = ({ token, setToken }) => (
  <header className="header">
    <Link to="/">
      <header>
        <h1>Blogger Home</h1>
      </header>
    </Link>

    <nav className="login-bar">
      <a
        href={process.env.REACT_APP_USERS_URL}
        className="link"
        target="_blank"
        rel="noreferrer"
      >
        Users
      </a>
      {token && (
        <div className="login-links">
          <div className="link" onClick={() => setToken(null)}>
            Logout
          </div>
        </div>
      )}
    </nav>
  </header>
);

export default LoginBar;
