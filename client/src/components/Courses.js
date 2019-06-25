import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Courses extends Component {
  state = {
    courses: []
  };
  componentDidMount() {
    this.getCourses();
  };

    axios.get('http://localhost:5000/api/courses')
    .then( res => {
      const courses = res.data;
      this.setState({ courses})
    });
};

render() {
  return(
    <div>
      { courses }
    </div>
  );
}
