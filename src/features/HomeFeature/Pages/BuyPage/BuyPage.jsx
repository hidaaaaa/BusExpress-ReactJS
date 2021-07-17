import { Progress } from 'antd';
import Layout from 'antd/lib/layout/layout';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ListTicketPage from './Page/ListTicketPage/ListTicketPage';
import './style/buyPage.scss';

function BuyPage() {
	const [loading, setLoading] = useState(true);
	const [listTrip, setListTrip] = useState({});
	const [buses, setBuses] = useState([]);
	const match = useRouteMatch();
	const location = useLocation();
	const history = useHistory();

	let queryParams = useMemo(() => {
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

	const handleSumitPrev = ({ step }) => {
		if (step === '1') {
			history.push('/home');
		}
	};
	const handleSumitNext = ({ step }) => {
		if (step === '1') {
			queryParams = {
				...queryParams,
				step: 2,
			};
		}
		history.push(`/home/buy?tripid=${queryParams.tripid}&date=${queryParams.date}&step=2`);
		console.log(queryParams.step);
	};

	if (loading) {
		return <Loading text="loading..." />;
	}

	return (
		<Layout className="buyPage">
			<div className="buyPage__container">
				<div className="process">
					<div className="process__title">buy ticket</div>
					<Progress
						percent={(queryParams.step * 100) / 4}
						status="active"
						showInfo={false}
						strokeColor={{
							'0%': '#108ee9',
							'100%': '#87d068',
						}}
						className="process__processBar"
					/>

					<div className="process__status">
						<div></div>
						<div>Choose Ticket</div>
						<div>Infomation</div>
						<div>payment</div>
						<div>done</div>
					</div>
				</div>

				<Switch>
					{queryParams.step === '1' ? (
						<Route path={match.url} exact>
							<ListTicketPage
								listTrip={listTrip}
								buses={buses}
								queryParams={queryParams}
								handleSumitPrev={handleSumitPrev}
								handleSumitNext={handleSumitNext}
							/>
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
			</div>
		</Layout>
	);
}

export default BuyPage;
