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
import UserContext from './components/UserContext';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

class App extends Component {

 // Initialize state
	state = {
		authUserData: {},
		Authenticated: false
	};

	// Signin authentication, data persisting
	handleSignIn = (e, email, password, props) => {
		if(e){
			e.preventDefault();
		}
	// Authenticate user by request to REST API's users endpoint
		axios.get("http://localhost:5000/api/users",
			{
				auth: {
					username: email,
					password: password
				}
			})
			.then(res => {
				if (res.status === 200) {
					const user = res.data;
					const name = user.firstName + " " + user.lastName;
					console.log("SignIn successful");

// Redirect User to list of courses on SignIn
			  const { history, location } = props;
			  const path = location.state ? location.state.prevLocation : '/courses';
			  history.push(path);
					this.props.history.push("/courses");

					// Persist data locally using React's localStorage browser instance
					React.useEffect(() => {
						localStorage.setItem("id", user.id)
					}, [user.id]);
						localStorage.setItem("username", email);
						localStorage.setItem("password", password);
						localStorage.setItem("name", name);
					}
			}).catch(err => {
				if(err.status === 400){
					//login failed
					console.log(this.state,'401');
					console.log("SignIn failing here");
					this.props.history.push("/error");
					//server error, show Error page
				} else if (err.status === 500) {
					this.props.history.push("/error");
				}
			});
	}
	// signOut, re-initialize state
	async handleSignOut(){
		localStorage.clear();
		await this.setState({
			authUserData: {},
			Authenticated: false
		});
		this.props.history.push("/courses");
	}

  render(){
  return (
	  <UserContext.Provider value={{
		  signIn: this.handleSignIn.bind(this),
			signOut: this.handleSignOut.bind(this)
				}}>
		 <BrowserRouter>
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
						{/* Routes for all Courses and individual Course by Id */}
						<Route exact path="/courses" render={() => <Courses />}/>
						<Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />} />
						{/* Private routes for auth'd users to Create Course */}
						<PrivateRoute exact path="/courses/create" component={ CreateCourse } />
						{/* Error Route */}
						<Route exact path="/error" render={() => <Error />} />
					</Switch>
			   </div>
			  </div>
			</BrowserRouter>
	  </UserContext.Provider>
  );}
}
export default App;
