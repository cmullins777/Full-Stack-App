import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from './UserContext';
import axios from 'axios';

class CourseDetail extends Component {
  state = {
    course: {},
    username: ""
  };
  componentDidMount() {
    this.getCourseDetail();
  }
// Axios GET request for individual course
  getCourseDetail = () => {
    axios.get("http://localhost:5000/api/courses/" + this.props.match.params.id)
      .then(res => {
        const course = res.data.course;
        this.setState({
          course,
          username: course.User.firstName + " " + course.User.lastName
        });
        console.log(course.User.id);
   })
// Display Error page for all errors
   .catch(err => {
     if(err.response.status === 400) {
       this.props.history.push("/notfound");
     } else if(err.response.status === 500) {
       this.props.history.push("/error");
       console.log(err);
     }
   });
  }
// Axios DELETE request to delete individual course
  handleDelete  = (e, emailAddress, password, authenticated) => {
    e.preventDefault();
    axios.delete("http://localhost:5000/api/courses/" + this.props.match.params.id,
    {
       auth: {
         username: emailAddress,
         password: password
       }
    })
    .then(res => {
      this.props.history.push("/courses");
      console.log("Course deleted.");
    })
    .catch(err => {
      if(err.response.status === 404 || 500) {
        this.props.history.push("/error");
        console.log(err);
      }
    });
  }

  render() {
    return(
     <Consumer>{ ({ user, authenticated, emailAddress, password }) => (
      <div id="root">
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
             { ( authenticated && (user.id === this.state.course.userId) )
               ?
              (
               <span>
                <Link className="button" to={"/courses/"+this.state.course.id+"/update"}>Update Course</Link>
                <button className="button" onClick={e => this.handleDelete(e, emailAddress, password, authenticated)}>Delete Course</button>
               </span>
               )
               :
               (
                 <span></span>
               )
              }
             <Link className="button button-secondary" to="/courses">Return to List</Link>
            </div>
          </div>
        </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course-label">Course</h4>
            <h3 className="course--title">{this.state.course.title}</h3>
            <p>By {this.state.username} </p>
          </div>
          <div className="course--description">
            <ReactMarkdown source={this.state.course.description} />
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{this.state.course.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  <ReactMarkdown source={this.state.course.materialsNeeded} />
                </ul>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
 )}</Consumer>
);
}
}

export default withRouter (CourseDetail);
