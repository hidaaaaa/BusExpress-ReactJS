import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BackTop, Layout } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Footer from 'components/Footer/Footer';
import AuthFeature from 'features/AuthFeature/AuthFeature';
import { Redirect, Route, Switch } from 'react-router';
import './App.scss';
import Header from './components/Header/Header';
import HomeFeature from './features/HomeFeature/HomeFeature';

function App() {
	return (
		<div className="app">
			<BackTop>
				<div className="backtop">
					<FontAwesomeIcon icon={faArrowCircleUp} />
				</div>
			</BackTop>
			<Layout className="layout">
				<Header />
				<div className="body">
					<Switch>
						<Redirect from="/" to="/home" exact />
						<Redirect from="/post-list/:pistId" to="/posts/:postId" exact />

						<Route path="/home" component={HomeFeature} />
						<Route path="/auth" component={AuthFeature} />
					</Switch>
				</div>
				<Footer />
			</Layout>
		</div>
	);
}

export default App;
