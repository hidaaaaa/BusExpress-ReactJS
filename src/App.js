import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminFeature from 'AdminFeature/AdminFeature';
import { BackTop, Layout } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Footer from 'components/Footer/Footer';
import AboutUsFeature from 'features/AboutUsFeature/AboutUsFeature';
import AuthFeature from 'features/AuthFeature/AuthFeature';
import BuyTicketFeature from 'features/BuyTicketFeature/BuyTicketFeature';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import './App.scss';
import Header from './components/Header/Header';
import HomeFeature from './features/HomeFeature/HomeFeature';

function App() {
	const user = useSelector((state) => state.auth.current.user);

	return (
		<div className="app">
			<BackTop>
				<div className="backtop">
					<FontAwesomeIcon icon={faArrowCircleUp} />
				</div>
			</BackTop>
			{!!user ? (
				user.role === 'admin' ? (
					<Switch>
						<Redirect from="/" to="/admin" exact />
						<Redirect from="/home" to="/admin" exact />
						<Route path="/admin" component={AdminFeature} />
					</Switch>
				) : (
					<Layout className="layout">
						<Header />
						<div className="body">
							<Switch>
								<Redirect from="/" to="/home" exact />
								<Redirect from="/post-list/:pistId" to="/posts/:postId" exact />
								<Redirect from="/admin" to="/home" exact />

								<Route path="/auth" component={AuthFeature} />

								<Route path="/home" component={HomeFeature} />
								<Route path="/buy-ticket" component={BuyTicketFeature} />
								<Route path="/about-us" component={AboutUsFeature} />
							</Switch>
						</div>
						<Footer />
					</Layout>
				)
			) : (
				<Layout className="layout">
					<Header />
					<div className="body">
						<Switch>
							<Redirect from="/" to="/home" exact />
							<Redirect from="/post-list/:pistId" to="/posts/:postId" exact />
							<Redirect from="/admin" to="/home" exact />

							<Route path="/auth" component={AuthFeature} />

							<Route path="/home" component={HomeFeature} />
							<Route path="/buy-ticket" component={BuyTicketFeature} />
							<Route path="/about-us" component={AboutUsFeature} />
						</Switch>
					</div>
					<Footer />
				</Layout>
			)}
		</div>
	);
}

export default App;
