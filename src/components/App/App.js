import { useState } from 'react';
import './App.scss';

import { Menu, Login } from '../index';

// const devToken =
//   'ZeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZGF0ZUNyZWF0ZWQiOiIyMDIwLTEyLTEzVDE3OjI5OjIyLjY0MFoiLCJfaWQiOiI1ZmQ2NGY5MjBmODYyMzIyMGM2OGUwOWIiLCJlbWFpbCI6Im5tQHlhaG9vLmNhIiwicGFzc3dvcmQiOiIkMmEkMTAkdU1ybVMvNE1LeDI0QWJSYTZSd3EzdTJMaHJqOG9HL296QlhwV2tPemRSR3MxbmQyU2pFamEiLCJ1c2VybmFtZSI6Im5tIiwiX192IjowLCJpYXQiOjE2MDk1MzU0MTcsImV4cCI6MTYwOTYyMTgxN30.xpF7ERiS1lRaXMQW94AiC12zb9erTaSLjaU_aLbNf44';
// const devUsername = 'nm';

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <div>
      <h1>Blogger Home</h1>
      <div className="app">
        {token ? (
          <Menu {...{ token }} {...{ username }} />
        ) : (
          <Login {...{ setToken }} {...{ setUsername }} />
        )}
      </div>
    </div>
  );
};

export default App;
