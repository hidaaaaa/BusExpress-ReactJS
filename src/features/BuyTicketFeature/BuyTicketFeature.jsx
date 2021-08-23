import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BuyMainPage from './Page/BuyMainPage/BuyMainPage';

function BuyTicketFeature(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route path={match.url} exact component={BuyMainPage} />
			<Route path={`${match.url}/buy`} component={'BuyPage'} />
		</Switch>
	);
}

export default BuyTicketFeature;
