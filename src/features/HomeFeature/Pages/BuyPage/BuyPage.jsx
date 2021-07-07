import { Progress } from 'antd';
import Layout from 'antd/lib/layout/layout';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import ListTicketPage from './Page/ListTicketPage/ListTicketPage';
import './style/buyPage.scss';

function BuyPage(props) {
	const [loading, setLoading] = useState(true);
	const [listTrip, setListTrip] = useState({});
	const [buses, setBuses] = useState([]);
	const match = useRouteMatch();
	const location = useLocation();

	const queryParams = useMemo(() => {
		const params = queryString.parse(location.search);

		return {
			...params,
			tripid: params.tripid || '',
			date: params.date || '',
		};
	}, [location.search]);

	useEffect(() => {
		(async () => {
			try {
				const data = await busApi.getPostsOfTripByDate(queryParams);
				const buses = await busApi.getAll();

				await setBuses(buses);
				await setListTrip(data);
			} catch (error) {
				console.log('false to fetch  list transfer :', error);
			}
			setLoading(false);
		})();
	}, [queryParams]);

	if (loading) {
		return <Loading text="loading..." />;
	}

	return (
		<Layout className="buyPage">
			<div className="buyPage__container">
				<Progress
					percent={(queryParams.step * 100) / 3}
					status="active"
					showInfo={false}
					strokeColor={{
						'0%': '#108ee9',
						'100%': '#87d068',
					}}
					className="processBar"
				/>

				<Switch>
					{queryParams.step === '1' ? (
						<Route path={match.url} exact>
							<ListTicketPage listTrip={listTrip} buses={buses} queryParams={queryParams} />
						</Route>
					) : queryParams.step === '2' ? (
						<Route path={match.url} exact>
							<>step 2</>
						</Route>
					) : (
						<Route path={match.url} exact>
							<>step 3</>
						</Route>
					)}
				</Switch>

				<div className="button">
					<div className="button__prev">Back</div>

					<div className="button__next">Next</div>
				</div>
			</div>
		</Layout>
	);
}

export default BuyPage;
