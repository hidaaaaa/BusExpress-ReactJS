import { notification, Progress } from 'antd';
import Layout from 'antd/lib/layout/layout';
import Modal from 'antd/lib/modal/Modal';
import busApi from 'api/busApi';
import paymentApi from 'api/paymentApi';
import Loading from 'components/Loading/Loading';
import Paypal from 'components/Paypal/Paypal';
import LoginPage from 'features/AuthFeature/Page/LoginPage';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import InformationTicketPage from './Page/InformationTicketPage/InformationTicketPage';
import ListTicketPage from './Page/ListTicketPage/ListTicketPage';
import PaymentPage from './Page/PaymentPage/PaymentPage';
import './style/buyPage.scss';
import { deleteTicket } from './ticketSlice';

function BuyPage() {
	const tickets = useSelector((state) => state.tickets.tickets.tickets);
	const loggedInUser = useSelector((state) => state.auth.current.rs);
	const isLoggedIn = !!loggedInUser;

	const dispatch = useDispatch();
	const match = useRouteMatch();
	const location = useLocation();
	const history = useHistory();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadingPayment, setLoadingPayment] = useState(true);
	const [listTrip, setListTrip] = useState({});
	const [buses, setBuses] = useState([]);

	const [informationPayment, setInformationPayment] = useState('');

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	let queryParams = useMemo(() => {
		const params = queryString.parse(location.search);

		return {
			...params,
			tripid: params.tripid || '',
			date: params.date || '',
			time: params.time || '',
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

	const handleSumitPrev = ({ step }) => {
		if (step === '1') {
			history.push('/home');
		}
		if (step === '2') {
			queryParams = {
				...queryParams,
				step: 1,
			};
			history.push(`/home/buy?tripid=${queryParams.tripid}&date=${queryParams.date}&step=1`);
		}
	};
	const handleSumitNext = async ({ step, informationPayment = '' }) => {
		if (step === '1') {
			queryParams = {
				...queryParams,
				step: 2,
			};
			history.push(`/home/buy?tripid=${queryParams.tripid}&date=${queryParams.date}&step=2`);
		} else if (step === '2') {
			setInformationPayment(informationPayment);
			setLoadingPayment(false);
			setIsModalVisible(true);
		}
	};

	const onSuccess = async (values) => {
		if (values) {
			try {
				const results = await paymentApi.payment(informationPayment);
				const action = await deleteTicket();
				dispatch(action);
				queryParams = {
					...queryParams,
					step: 3,
				};
				setIsModalVisible(false);
				history.push(`/home/buy?tripid=${queryParams.tripid}&date=${queryParams.date}&step=3`);
				console.log(results, loadingPayment);
			} catch (error) {
				return notification.error({
					message: 'Error!!!',
					description: 'tickets was buyed by some other',
				});
			}
		}
	};

	return (
		<Layout className="buyPage">
			<div className="buyPage__container">
				<div className="process">
					<div className="process__title">buy ticket</div>
					<Progress
						percent={(queryParams.step * 100) / 3}
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
						<Route
							render={({ location }) =>
								isLoggedIn ? (
									<>
										{!!tickets ? (
											<>
												<InformationTicketPage
													buses={buses}
													listTrip={listTrip}
													queryParams={queryParams}
													handleSumitPrev={handleSumitPrev}
													handleSumitNext={handleSumitNext}
												/>
											</>
										) : (
											<>
												<Redirect to={`/home/buy?tripid=${queryParams.tripid}&date=${queryParams.date}&step=1`} />
											</>
										)}
									</>
								) : (
									<LoginPage url={`${location.pathname}${location.search}`} />
								)
							}
						/>
					) : (
						<Route path={match.url} exact>
							<PaymentPage
								queryParams={queryParams}
								handleSumitPrev={handleSumitPrev}
								handleSumitNext={handleSumitNext}
							/>
						</Route>
					)}
				</Switch>
			</div>

			<Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
				<Paypal queryParams={queryParams} onSuccess={onSuccess} informationPayment={informationPayment} />
			</Modal>
		</Layout>
	);
}

export default BuyPage;
