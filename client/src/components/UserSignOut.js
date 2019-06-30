import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

// Non-rendering, Signs out authenticated user, redirects to '/courses'
class UserSignOut extends Component {
	render(){
		return (<Redirect to="/courses" />);
	}

}

export default UserSignOut;
