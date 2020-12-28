import { useState } from 'react';
import './App.css';

import Menu from './Menu';
import Login from './Login';

const devToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZGF0ZUNyZWF0ZWQiOiIyMDIwLTEyLTEzVDE3OjI5OjIyLjY0MFoiLCJfaWQiOiI1ZmQ2NGY5MjBmODYyMzIyMGM2OGUwOWIiLCJlbWFpbCI6Im5tQHlhaG9vLmNhIiwicGFzc3dvcmQiOiIkMmEkMTAkdU1ybVMvNE1LeDI0QWJSYTZSd3EzdTJMaHJqOG9HL296QlhwV2tPemRSR3MxbmQyU2pFamEiLCJ1c2VybmFtZSI6Im5tIiwiX192IjowLCJpYXQiOjE2MDkxNzAyNTMsImV4cCI6MTYwOTI1NjY1M30.WqPDZUcIlKxOL5650YFNRy8UB64poJOS_lzz0-GswOQ';
const devUsername = 'nm';

const App = () => {
  const [token, setToken] = useState(devToken);
  const [username, setUsername] = useState(devUsername);

  return (
    <div>
      <h1>Blogger Home</h1>
      {(token) 
      ? <Menu {...{token}} {...{username}}/>
      : <Login {...{setToken}} {...{setUsername}}/>
      }
    </div>
  )
}


export default App;
