import React from 'react' ;
import {Route, Redirect} from 'react-router-dom';
import { Consumer } from './UserContext';

// Private routes for authorized actions '/courses/create' and '/courses/:id/update'
const PrivateRoute = ({ component: Component , path }) => (
	<Route
		path={path}
		render={(props)=>(
			<Consumer>{ ({user, emailAddress, password, loggedIn}) => (
				user && emailAddress && password && loggedIn ?
				(
					<Component {...props} />
				)
				:
				(
					<Redirect to="/signin" />
				)
			)}</Consumer>

		)}
		 />
);

export default PrivateRoute
