import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function BuyTicketFeature(props) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route path={match.url} exact component={'MainPage'} />
			<Route path={`${match.url}/buy`} component={'BuyPage'} />
		</Switch>
	);
}

export default BuyTicketFeature;
