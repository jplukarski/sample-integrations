import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home'
import Success from './pages/Success';
import Failure from './pages/Failure';
import Checkout from './pages/Checkout'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/success' component={Success} />
        <Route exact path='/failure' component={Failure} />
      </Switch>
    </Router>
  );
}

export default App;