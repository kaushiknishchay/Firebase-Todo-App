import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import './App.css';
import store from './store';
import { Wrapper } from './base_components/Wrapper';
import HomePage from './components/HomePage';
import Header from './base_components/Header';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <Wrapper>
              <Route exact path="/" component={HomePage} />
            </Wrapper>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
