import React, { Component } from 'react';
import './App.css';
import Root from './components/root';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Root subtitle={'face detection'}/>
      </div>
    );
  }
}

export default App;
