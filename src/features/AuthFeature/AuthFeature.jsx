import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AccountPage from './Page/AccountPage';
import ForgotPage from './Page/ForgotPage';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import './style/authFeature.scss';

function AuthFeature(props) {
	const match = useRouteMatch();
	const loggedInUser = useSelector((state) => state.auth.current.rs);

	const isLoggedIn = !!loggedInUser;

	return (
		<Switch>
			{isLoggedIn ? (
				<>
					<Redirect from={match.url} to={`${match.url}/account`} />

					<Route path={`${match.url}/account`}>
						<AccountPage />
					</Route>
				</>
			) : (
				<>
					{/* <Redirect from={match.url} to={`${match.url}/login`} exact /> */}

					<Route path={`${match.url}/login`} exact>
						<LoginPage />
					</Route>
					<Route path={`${match.url}/register`}>
						<RegisterPage />
					</Route>
					<Route path={`${match.url}/forgot`}>
						<ForgotPage />
					</Route>
				</>
			)}
		</Switch>
	);
}

export default AuthFeature;
