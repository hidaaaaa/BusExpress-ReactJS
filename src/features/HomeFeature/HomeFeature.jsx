import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import BuyPage from './Pages/BuyPage/BuyPage';
import MainPage from './Pages/MainPage/MainPage';
import './styles/styles.scss';

function HomeFeature(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route path={match.url} exact component={MainPage} />
			<Route path={`${match.url}/buy`} component={BuyPage} />
		</Switch>
	);
}

export default HomeFeature;
