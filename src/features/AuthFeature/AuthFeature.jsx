import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import './style/authFeature.scss';

function AuthFeature(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Redirect from={match.url} to={`${match.url}/login`} exact />

			<Route path={`${match.url}/login`}>
				<LoginPage />
			</Route>
			<Route path={`${match.url}/register`}>
				<RegisterPage />
			</Route>
		</Switch>
	);
}

export default AuthFeature;
