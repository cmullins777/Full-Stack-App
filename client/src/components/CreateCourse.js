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
		errMsg: ""
	};

// Receives Course data input by User
	handleCourseInput = (e) => {
		e.preventDefault();
		const input = e.target;
		this.setState({
			[input.name] : input.value
		});
	};

	handleNewCourse = (e, error) => {
		e.preventDefault();

// Axios POST request to post course to api db
		axios("http://localhost:5000/api/courses", {
      method: "POST",
			auth: {
				username: localStorage.getItem("username"),
				password: localStorage.getItem("password")
			},
			data: {
				title: this.state.title,
				description: this.state.description,
				estimatedTime: this.state.estimatedTime,
				materialsNeeded: this.state.materialsNeeded,
				userId: localStorage.getItem("id")
			}
		})
		.then(res => {
			this.props.history.push("/courses");
			console.log("course successfully created");
//  Catch Validation Errors returned from the REST API and display for user guidance, for other errors redirect to Errors page
		}).catch(err => {
			if(err.response.status === 400){
				this.setState({
					errMsg: err.response.data.err[0].message
				})
			} else if (err.response.status === 401){
				this.setState({
					errMsg: err.response.data.error.message
				})
			}	else {
				this.props.history.push("/error");
				console.log(err.response.status);
		}
	 });
	}

	render(){
		const { title, description, estimatedTime, materialsNeeded, errMsg } = this.state;
		return(
			<div className="bounds course--detail">
				<h1>Create Course</h1>
				<div>
				<Consumer>{ ({ user, emailAddress, password, authenticated  }) => (
			  	<div>
				 	{ errMsg ? (
						<div>
						  <h2 className="validation--errors--label">Registration Error</h2>
							<div className="validation-errors">
							  <ul>
								  <li>{ errMsg }</li>
								</ul>
							</div>
						</div>
					) : ''}
					<form onSubmit={e => this.handleNewCourse(e, user, emailAddress, password, title, description, materialsNeeded, estimatedTime, authenticated)}>
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
									<p>By {user.firstName} {user.lastName}</p>
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
					</div>
				)}</Consumer>
				</div>
    	</div>
		);
	}
}

export default withRouter(CreateCourse);
