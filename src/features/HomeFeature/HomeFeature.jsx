import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import MainPage from './Pages/MainPage/MainPage';
import './styles/styles.scss';

function HomeFeature(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route path={match.url} exact component={MainPage} />
		</Switch>
	);
}

export default HomeFeature;
