import { Link, Route, Switch } from 'react-router-dom';

import { useState } from 'react';
import './App.scss';

import { Menu, Login, Signup, LoginBar } from 'components/index';

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
