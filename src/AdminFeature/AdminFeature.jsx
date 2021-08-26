import { DesktopOutlined, FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { logout } from 'features/authSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import BusesPage from './Page/BusesPage/BusesPage';
import LocationPage from './Page/LocationPage/LocationPage';
import TripsPage from './Page/TripsPage/TripsPage';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminFeature(props) {
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const [collapsed, setCollapsed] = useState(false);
	const user = useSelector((state) => state.auth.current.user);

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	const handleSignoutClick = () => {
		const action = logout();
		dispatch(action);
	};

	console.log(`${match.url}/buses`);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<SubMenu key="sub1" icon={<UserOutlined />} title={user.email}>
						<Menu.Item key="3" onClick={handleSignoutClick}>
							Logout
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						<Link to={`${match.url}/buses`}>buses</Link>
					</Menu.Item>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						<Link to={`${match.url}/location`}>location</Link>
					</Menu.Item>
					<Menu.Item key="9" icon={<FileOutlined />}>
						<Link to={`${match.url}/trips`}>trips</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0, color: '#ffffff', fontSize: '2rem' }}>
					Bus express
				</Header>
				<Content className="home">
					<Switch>
						<Redirect from={match.url} to={`${match.url}/buses`} exact />

						<Route path={`${match.url}/buses`}>
							<BusesPage />
						</Route>
						<Route path={`${match.url}/location`}>
							<LocationPage />
						</Route>
						<Route path={`${match.url}/trips`}>
							<TripsPage />
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}

export default AdminFeature;
