import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import axios from 'axios';

// Client components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Error from './components/Error';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { Provider } from './components/UserContext';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

class App extends Component {

// Initialize state
	state = {
		user: {},
		username: "",
		password: "",
		authenticated: false,
		errMsg: ""
	};

// Signin authentication, data persisting
	handleSignIn = (e, emailAddress, password, props, err) => {
		if(e){
			e.preventDefault();
		}
// Authenticate user by request to REST API's users endpoint
		axios.get("http://localhost:5000/api/users",
			{
				auth: {
					username: emailAddress,
					password: password
				}
			})
			.then(res => {
				if (res.status === 200) {
					const user = res.data;
					this.setState({
						user: user,
						userId: user.id,
						authenticated: true,
						password: user.password,
						username: user.emailAddress,
					});
					console.log("SignIn successful");
					console.log("user.id is " + user.id);
					console.log(user);

					console.log(emailAddress);
					console.log(password);

	// Persist data locally using React's localStorage browser instance
					localStorage.setItem("id", user.id);
					localStorage.setItem("user", user);
					localStorage.setItem("username", emailAddress);
					localStorage.setItem("password", password);
					localStorage.setItem("authenticated", true)

			}}).catch(err => {
					if(err.response.status === 400){
						this.setState({
							errMsg: err.response.data.error.message
						})
					} else if (err.status === 401){
						this.setState({
							errMsg: err.response.message
						})
					}	else {
						console.log(err.response.status);
						console.log(err);
					}
			});
			console.log(localStorage.getItem("username"));
			console.log(localStorage.getItem("password"));
	}

	// signOut, re-initialize state
	async handleSignOut(username, password, userId){
		localStorage.clear();
		await this.setState({
			user: {},
			username: "",
			password: "",
			authenticated: false
		});
		console.log("username is " + username);
		console.log("password is " + password);
		console.log("userId is " + userId);
	}

  render(){
  return (
		<BrowserRouter>
	  <Provider value={{
			user: this.state.user,
			userId: this.state.user.id,
			emailAddress: this.state.emailAddress,
			password: this.state.password,
			authenticated: this.state.authenticated,
		  signIn: this.handleSignIn.bind(this),
			signOut: this.handleSignOut.bind(this),
			errMsg: this.errMsg
				}}>

			<div>
				<Header props={this.props}/>
				 <div className="bounds">
					<Switch>
				  	{/* Root route redirects to All Courses */}
						<Route exact path="/" render={()=> <Redirect to="/courses" />}/>
						{/* Route for User SignIn, SignUp, SignOut */}
						<Route exact path="/signin" render={ () => <UserSignIn />} />
						<Route exact path="/signup" render={() => <UserSignUp />} />
						<Route exact path="/signout" render={() => <UserSignOut />} />
						{/* Route for all Courses */}
						<Route exact path="/courses" render={() => <Courses />}/>
						{/* Private routes for auth'd users to Create Course, Update Course */}
						<PrivateRoute exact path="/courses/:id/update" component={ UpdateCourse } />
						<PrivateRoute exact path="/courses/create" component={ CreateCourse } />
						{/* Route to view individual course */}
						<Route exact path="/courses/:id" component={CourseDetail} />
						{/* Error Route */}
						<Route exact path="/error" render={() => <Error />} />
					</Switch>
			   </div>
			  </div>

	  </Provider>
	</BrowserRouter>
  );}
}
export default App;
