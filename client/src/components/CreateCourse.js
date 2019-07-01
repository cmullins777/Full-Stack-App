import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from './UserContext';
import { Link, withRouter } from 'react-router-dom';

class CreateCourse extends Component {
// Initialize state for new Course details
	state = {
    id: "",
		title: "",
		description: "",
		estimatedTime: "",
		materialsNeeded: "",
		err:{}
	};

// Receives Course data input by User
	handleCourseInput = (e) => {
		e.preventDefault();
		const input = e.target;
		this.setState({
			[input.name] : input.value
		});
	};

	handleNewCourse = (e, emailAddress, password, user, signin) => {
		e.preventDefault();
// Axios POST request to post course to api db
		axios("http://localhost:5000/api/courses", {
      method: "POST",
			auth: {
				username: localStorage.getItem("emailAddress"),
				password: localStorage.getItem("password")
			},
			data: {
        user: localStorage.getItem("id"),
				title: this.state.title,
				description: this.state.description,
				estimatedTime: this.state.estimatedTime,
				materialsNeeded: this.state.materialsNeeded,
			}
		})
		.then(res => {
			this.props.history.push("/courses");
		}).catch(err => {
			console.log(err.response,'err');
			this.setState({
			  err:err.response
			});
			if(err.response.status === 500){
				this.props.history.push("/error");
			}
		});
	}

  handleCancel = (e) => {
      e.preventDefault();
      this.props.history.push("/courses");
    };

	render(){
		return(
			<div className="bounds course--detail">
				<h1>Create Course</h1>
				<div>
				<Consumer>{ ({ emailAddress }) => (
					<form onSubmit={e => this.handleNewCourse(e, localStorage.getItem("emailAddress"),
            localStorage.getItem("password"))}>
							<div className="grid-66">
								<div className="course--header">
								 <h4 className="course--label">Course</h4>
									<div>
										<input
											id="title"
											name="title"
											type="text"
											className="input-title course--title--input"
											placeholder="Course title..."
											onChange={this.handleCourseInput} />
									</div>
									<p>By {localStorage.getItem("name")}</p>
								</div>
								<div className="course--description">
									<div>
										<textarea
											id="description"
											name="description"
											className=""
											placeholder="Course description..."
											onChange={this.handleCourseInput} >
										</textarea>
									</div>
								</div>
							</div>
							<div className="grid-25 grid-right">
								<div className="course--stats">
									<ul className="course--stats--list">
										<li className="course--stats--list--item">
											<h4>Estimated Time</h4>
											<div>
												<input
													id="estimatedTime"
													name="estimatedTime"
													type="text"
													className="course--time--input"
													placeholder="Hours"
													onChange={this.handleCourseInput} />
											</div>
										</li>
										<li className="course--stats--list--item">
											<h4>Materials Needed</h4>
											<div>
												<textarea
													id="materialsNeeded"
													name="materialsNeeded"
													className=""
													placeholder="List materials..."
													onChange={this.handleCourseInput} >
													</textarea>
												</div>
									  	</li>
								  	</ul>
								  </div>
						  	</div>
						  	<div className="grid-100 pad-bottom">
								  <button className="button" type="submit">Create Course</button>
								  <Link className="button button-secondary" to={"/courses/"}>Cancel</Link>
							</div>
						</form>
				)}</Consumer>
				</div>
    	</div>
		);
	}
}

export default withRouter(CreateCourse);
