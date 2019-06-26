import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import axios from 'axios';

import Courses from "./components/Courses.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
// App layout rendered to the DOM with routes for each selection option
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/courses" render={ () => <Courses />}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
