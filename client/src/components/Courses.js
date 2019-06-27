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
          this.props.history.push("/error");
        }
      });
  }

  render() {
    return(
      <div className="bounds">
        { this.state.courses.map((course,index) => (
          <div className="grid-33" key={index}>
            <Link className="course--module course--link" to={ "/courses/"+course.id } >
              <h4 className="course--label" > Course </h4>
              <h3 className="course--title" >{ course.title }</h3>
            </Link>
          </div>
        ))
        }
      </div>
    );
  }
}

export default Courses;
