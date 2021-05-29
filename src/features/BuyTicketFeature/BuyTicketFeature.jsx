import { IdcardOutlined, LoadingOutlined, SearchOutlined, SelectOutlined, WalletOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import Layout from 'antd/lib/layout/layout';
import queryString from 'query-string';
import React, { useMemo, useState } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import ListTicketPage from './pages/ListTicketPage/ListTicketPage';

const { Step } = Steps;

function BuyTicketFeature(props) {
	const match = useRouteMatch();
	const location = useLocation();

	const [process, setProcess] = useState(['finish', 'process', 'wait', 'wait']);

	const queryParams = useMemo(() => {
		const params = queryString.parse(location.search);
		if (params.step === '2') {
			setProcess(() => {
				return ['finish', 'process', 'wait', 'wait'];
			});
		}
		if (params.step === '3') {
			setProcess(() => {
				return ['finish', 'finish', 'process', 'wait'];
			});
		}
		if (params.step === '4') {
			setProcess(() => {
				return ['finish', 'finish', 'finish', 'process'];
			});
		}

		return {
			...params,

			tripid: params.tripid || '',
			date: params.date || '',
		};
	}, [location.search]);

	return (
		<Layout style={{ padding: '50px 50px', backgroundColor: '#fff' }}>
			<Steps size="small">
				<Step
					status={process[0]}
					title="Tìm chuyến xe"
					icon={process[0] !== 'process' ? <SearchOutlined /> : <LoadingOutlined />}
				/>
				<Step
					status={process[1]}
					title="Chọn ghế"
					icon={process[1] !== 'process' ? <SelectOutlined /> : <LoadingOutlined />}
				/>
				<Step
					status={process[2]}
					title="Thông tin khách hàng"
					icon={process[2] !== 'process' ? <IdcardOutlined /> : <LoadingOutlined />}
				/>
				<Step
					status={process[3]}
					title="Thanh toán"
					icon={process[3] !== 'process' ? <WalletOutlined /> : <LoadingOutlined />}
				/>
			</Steps>
			<Switch>
				{queryParams.step === '2' ? (
					<Route path={match.url} exact>
						<ListTicketPage queryParams={queryParams} />
					</Route>
				) : queryParams.step === '3' ? (
					<Route path={match.url} exact>
						<>step 3</>
					</Route>
				) : (
					<Route path={match.url} exact>
						<>step 4</>
					</Route>
				)}
			</Switch>
		</Layout>
	);
}

export default BuyTicketFeature;
