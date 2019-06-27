import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
//import axios from 'axios';

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

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
        <div className="bounds">
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/courses" />}/>
            <Route exact path="/courses" render={ () => <Courses />}/>
            <Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
