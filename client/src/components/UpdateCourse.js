import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Consumer } from './UserContext';

class UpdateCourse extends Component
{
	state = {
		id: "",
		title: "",
		description: "",
		estimatedTime: "",
		materialsNeeded: "",
		userId :'',
		err: {}
	};

	componentDidMount(){
		this.getCourse();
	}
	// Axios call to get selected course and set state
	getCourse = () => {
		axios.get("http://localhost:5000/api/courses/" + this.props.match.params.id)
			.then(res => {
				const course = res.data.course;
				console.log("course.userId is" + course.userId);
				console.log(course.userId);
				console.log(localStorage.getItem("id"));
				if(course.userId === parseInt(localStorage.getItem("id"))){
					this.setState({
						id: course.id,
						title: course.title,
						description: course.description,
						estimatedTime: course.estimatedTime,
						materialsNeeded: course.materialsNeeded,
						userId: course.userId
					});
				} else {
					this.props.history.push("/forbidden");
				}
			})
			.catch(err => {
				if (err.status === 400) {
					this.props.history.push("/notfound");
				} else if (err.status === 500) {
					this.props.history.push("/error");
				} else if (err.status === 403){
					this.props.history.push("/forbidden");
				}
			});
	}

	// Receive Updated Course data input by User
		handleUpdateInput = (e) => {
			e.preventDefault();
			const input = e.target;
			this.setState({
				[input.name] : input.value
			});
		};

	// Submit update
	handleSubmit = (e, user, emailAddress, password, signIn, authenticated) =>{
		e.preventDefault();
		console.log(emailAddress, password);
// Axios PUT request to post course to api db
		axios({
			method: 'put',
			url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
			auth: {
				username: localStorage.getItem("username"),
				password: localStorage.getItem("password")
				},
				data:{
					id: this.state.id,
					title: this.state.title,
					description: this.state.description,
					estimatedTime: this.state.estimatedTime,
					materialsNeeded: this.state.materialsNeeded,
					userId: this.state.userId
				}
			})
			.then( res => {
				// Show course details after updating
				this.props.history.push("/courses/"+this.props.match.params.id);
			})
			.catch(err => {
				this.setState({
					err: err.response,
				});
				if(err.response.status === 500){
					this.props.history.push("/error");
				} else {
					console.log('erroring here');
					console.log(localStorage.getItem("username"));
					console.log(localStorage.getItem("password"));
				}
			});
	}

	handleCancel = (e) => {
      e.preventDefault();
      this.props.history.push("/courses");
  };

	render(){
		return(
			<Consumer>{ ({ user, userId, authenticated, emailAddress, password, signIn }) => (
				<div className="bounds course--detail">
					<h1>Update Course</h1>
					<div>
						<form onSubmit={ e => this.handleSubmit(e, user, userId, emailAddress, password, signIn, authenticated)}>
							<div className="grid-66">
								<div className="course--header">
									<h4 className="course--label">Course</h4>
									<div>
										<input
											id="title"
											name="title"
											type="text"
											className="input-title course--title--input"
											placeholder="Course Title"
											value={this.state.title}
											onChange={this.handleUpdateInput} />
									</div>
									<p>By {user.firstName} {user.lastName}</p>
								</div>
								<div className="course--description">
									<div>
										<textarea
											id="description"
											name="description"
											className=""
											placeholder="Description"
											value={this.state.description}
											onChange={this.handleUpdateInput}>
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
													value={this.state.estimatedTime}
													onChange={this.handleUpdateInput} />
											</div>
										</li>
										<li className="course--stats--list--item">
											<h4>Materials Needed</h4>
											<div>
												<textarea
													id="materialsNeeded"
													name="materialsNeeded"
													className=""
													placeholder="Materials needed"
													value={this.state.materialsNeeded}
													onChange={this.handleUpdateInput}>
												</textarea>
											</div>
										</li>
									</ul>
								</div>
							</div>
						<div className="grid-100 pad-bottom">
							<button className="button" type="submit">Update Course</button>
							<button className="button button-secondary"><Link to="/courses">Cancel</Link></button>
						</div>
					</form>
				</div>
			</div>
		)}
		</Consumer>
		);
	}
}

export default withRouter(UpdateCourse);
