import './App.css';
import { Router } from '@reach/router';
import AllCovid from './components/AllCovid';
import CovidDetails from './components/CovidDetails';
import NewCovid from './components/NewCovid';
import EditCovid from './components/EditCovid';
import Header from './components/header'

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <AllCovid path="/covid" />
        <CovidDetails path="/covid/:id"/>
        <NewCovid path="/covid/new"/>
        <EditCovid path="/covid/:id/edit"/>
      </Router>
    </div>
  );
}

export default App;
