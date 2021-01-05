import { Link, Route, Switch } from 'react-router-dom';

import { useState } from 'react';
import './App.scss';

import { Menu, Login, Signup, LoginBar } from '../index';

// const devToken =
//   'ZeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZGF0ZUNyZWF0ZWQiOiIyMDIwLTEyLTEzVDE3OjI5OjIyLjY0MFoiLCJfaWQiOiI1ZmQ2NGY5MjBmODYyMzIyMGM2OGUwOWIiLCJlbWFpbCI6Im5tQHlhaG9vLmNhIiwicGFzc3dvcmQiOiIkMmEkMTAkdU1ybVMvNE1LeDI0QWJSYTZSd3EzdTJMaHJqOG9HL296QlhwV2tPemRSR3MxbmQyU2pFamEiLCJ1c2VybmFtZSI6Im5tIiwiX192IjowLCJpYXQiOjE2MDk1MzU0MTcsImV4cCI6MTYwOTYyMTgxN30.xpF7ERiS1lRaXMQW94AiC12zb9erTaSLjaU_aLbNf44';
// const devUsername = 'nm';

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <div className="app">
      <Link to="/">
        <header>
          <h1>Blogger Home</h1>
        </header>
      </Link>
      <Switch>
        <Route path="/" exact>
          {token ? (
            <Menu {...{ token }} {...{ username }} />
          ) : (
            <LoginBar {...{ setToken }} />
          )}
        </Route>
        <Route path="/login">
          <Login {...{ setToken }} {...{ setUsername }} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
