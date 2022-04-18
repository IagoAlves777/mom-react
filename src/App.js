import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Client, Home, SensorForm } from './pages';

function App() {
  return (
    <>
      <div className="header">
        <h1>Middleware Orientado a Mensagens - MOM</h1>
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
