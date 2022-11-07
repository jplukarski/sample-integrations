import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home'
import Success from './pages/Success';
import Failure from './pages/Failure';
import HostedFields from './pages/HostedFields'
import DropIn from './pages/DropIn'
import Header from './components/Header'
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Router>
        <Header/>
        <Container>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/hosted-fields' component={HostedFields} />
          <Route exact path='/drop-in' component={DropIn} />
          <Route exact path='/success' component={Success} />
          <Route exact path='/failure' component={Failure} />
        </Switch>
        </Container>
    </Router>
  );
}

export default App;