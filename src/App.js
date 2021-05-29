import { Col, Layout, Row } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import BuyTicketFeature from './features/BuyTicketFeature/BuyTicketFeature';
import HomeFeature from './features/HomeFeature/HomeFeature';

function App() {
	return (
		<div className="App">
			<Layout>
				<Row>
					<Col md={{ span: 22, offset: 1 }} xxl={{ span: 14, offset: 5 }}>
						<Header />

						<Switch>
							<Redirect from="/home" to="/" exact />
							<Redirect from="/post-list/:pistId" to="/posts/:postId" exact />

							<Route path="/" component={HomeFeature} exact />
							<Route path="/mua-ve" component={BuyTicketFeature} />
						</Switch>
					</Col>
				</Row>
			</Layout>
		</div>
	);
}

export default App;
