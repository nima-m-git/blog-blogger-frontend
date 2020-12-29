import { useState } from 'react';

const Login = ({ setToken, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const checkCredentials = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BE_URL + '/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.token) {
          setToken(result.token);
          setUsername(result.username);
        }
        if (result.message) {
          setError(result.message.message);
        }
      });
  };

  return (
    <form onSubmit={checkCredentials}>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
      {error && <div className="error-msg">{error}</div>}
    </form>
  );
};

export default Login;
