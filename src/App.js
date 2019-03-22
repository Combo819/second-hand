import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signin from './components/signin'
import Profile from './components/profile'
import Mainpage from './components/mainpage'
import Signup from './components/signup'
import history from './components/history';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
        <div>
          <Route path="/" exact component={Mainpage} />
          <Route path="/signin" component={Signin} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/signup" exact component={Signup} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
