import './App.css';
import React, { useState } from 'react';
import { Router } from '@reach/router';
import AllCovid from './components/AllCovid';
import CovidDetails from './components/CovidDetails';
import NewCovid from './components/NewCovid';
import EditCovid from './components/EditCovid';
import Header from './components/header';
import LoginReg from './views/LoginReg';
import Forbidden from './views/Forbidden';


function App() {
  const [ user, setUser ] = useState({
    username: "",
    id: ""
  });
  return (
    <div className="App">
      <Header user={ user } />
      <Router>
        <LoginReg path="/covid/loginreg" user={user} setUser={setUser} />
        <AllCovid default user={user}/>
        <CovidDetails path="/covid/:id"/>
        <NewCovid path="/covid/new"/>
        <EditCovid path="/covid/:id/edit"/>
        <Forbidden path="/heroes/forbidden" />
      </Router>
    </div>
  );
}

export default App;
