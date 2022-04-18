import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Client, Home, SensorForm } from './pages';

function App() {
  return (
    <>
      <div className="header">
        <span>SENSOR</span>
      </div>
      <div className="content">
        <Router>
          <Switch>
            <Route path="/sensor" component={SensorForm} />
            <Route path="/client" component={Client} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
