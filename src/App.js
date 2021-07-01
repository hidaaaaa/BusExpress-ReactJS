import { Layout } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Footer from 'components/Footer/Footer';
import { Redirect, Route, Switch } from 'react-router';
import './App.scss';
import Header from './components/Header/Header';
import HomeFeature from './features/HomeFeature/HomeFeature';

function App() {
	return (
		<div className="app">
			<Layout className="layout">
				<Header />
				<div className="body">
					<Switch>
						<Redirect from="/" to="/home" exact />
						<Redirect from="/post-list/:pistId" to="/posts/:postId" exact />

						<Route path="/home" component={HomeFeature} exact />
					</Switch>
				</div>
				<Footer />
			</Layout>
		</div>
	);
}

export default App;
