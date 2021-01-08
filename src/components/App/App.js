import { Route, Switch } from 'react-router-dom';

import { useState } from 'react';
import './App.scss';

import { Menu, Login, Signup, LoginPage } from 'components/index';
import LoginBar from './LoginBar';

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <div className="app">
      <LoginBar {...{ token }} {...{ setToken }} />

      <div className="container">
        {/* Routes */}
        <Switch>
          <Route path="/" exact>
            {token ? (
              <Menu {...{ token }} {...{ username }} />
            ) : (
              <LoginPage {...{ setToken }} />
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
    </div>
  );
};

export default App;
