import { useState } from 'react';
import './App.css';

import Menu from './Menu';
import Login from './Login';


const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

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
