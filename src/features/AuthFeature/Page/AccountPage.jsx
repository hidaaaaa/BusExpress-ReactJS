import { faPortrait, faSignOutAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import Layout from 'antd/lib/layout/layout';
import authApi from 'api/authApi';
import Loading from 'components/Loading/Loading';
import useWindowSize from 'CoustomHook/useWindowsSize';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import BookedTickets from '../Components/BookedTickets/BookedTickets';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
import Profile from '../Components/Profile/Profile';

function AccountPage() {
	const [size] = useWindowSize();
	const user = useSelector((state) => state.auth.current.rs);
	const [bookedTickets, setBookedTickets] = useState([]);
	const match = useRouteMatch();
	const [loading, setLoading] = useState(true);
	const [reload, setLoad] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const results = await authApi.bookedTickets(user);
				console.log(results);
				const temp = await results.map((item) => ({ ...item, NgayDi: item.NgayDi }));

				await setBookedTickets(temp);

				setLoading(false);
			} catch (error) {}
		})();
	}, [reload]);

	const onReload = (values) => {
		setLoad(values);
	};

	if (loading) return <Loading />;

	return (
		<Layout className="page">
			<Layout className="profilePage">
				<div className="profilePage__nav">
					<Menu
						style={{ width: '100%' }}
						inlineCollapsed={size < 1000 && size > 768}
						defaultSelectedKeys={['1']}
						mode="inline"
						theme="dark"
					>
						<Menu.Item key="1" icon={<FontAwesomeIcon icon={faPortrait} />}>
							<Link to={`${match.url}/profile`}>user</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<FontAwesomeIcon icon={faTicketAlt} />}>
							<Link to={`${match.url}/booked-tickets`}>Tickets</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
							<Link to={`${match.url}/change-password`}>Change Password</Link>
						</Menu.Item>
					</Menu>
				</div>
				<div className="profilePage__content">
					<Switch>
						<Redirect from={match.url} to={`${match.url}/profile`} exact />
						<Route path={`${match.url}/profile`}>
							<Profile />
						</Route>
						<Route path={`${match.url}/booked-tickets`}>
							<BookedTickets bookedTickets={bookedTickets} onSubmit={onReload} />
						</Route>
						<Route path={`${match.url}/change-password`}>
							<ChangePassword />
						</Route>
					</Switch>
				</div>
			</Layout>
		</Layout>
	);
}

export default AccountPage;
