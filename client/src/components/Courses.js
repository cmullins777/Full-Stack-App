import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Courses extends Component {
  state = {
    courses: []
  };

  componentDidMount() {
    this.getCourses();
  }

  getCourses = () => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        const courses = res.data;
        this.setState(courses);
      })
      .catch(err => {
        if(err.response.status === 500) {
          this.props.histor.push("/error");
        }
      });
  }

  render() {
    return(
      <div>
        { this.state.courses.map((course,index) => (
          <div>
            <Link to={ "/courses/" + course.id } >
              <h1 > Course </h1>
              <h1 >{ course.title }</h1>
            </Link>
          </div>
        ))
        }
      </div>
    );
  }
}

export default Courses;
