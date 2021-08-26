import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainAboutUsPage from './Page/MainAboutUsPage';

function AboutUsFeature(props) {
	const match = useRouteMatch();

	return (
		<Layout className="home">
			<Switch>
				<Route path={match.url} exact component={MainAboutUsPage} />
			</Switch>
		</Layout>
	);
}

export default AboutUsFeature;
