import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';
import Courses from "./components/Courses";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }
// App layout rendered to the DOM with routes for each selection option
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/courses" render={ () => <Courses data={this.state.results}/> } />
        </div>
      </BrowserRouter>
    );
  }
}
