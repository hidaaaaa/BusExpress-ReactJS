import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import locationAPI from '../../../../api/locationApi';
import Infomation from '../../Components/Infomation/Infomation';
import SeatMap from '../SeatMap/SeatMap';

function ListTicketPage({ queryParams }) {
	const history = useHistory();
	const location = useLocation();
	const [listTrip, setListTrip] = useState([]);
	console.log(queryParams);
	useEffect(() => {
		(async () => {
			try {
				const tempParams = { ...queryParams };

				delete tempParams.step;
				const data = await locationAPI.getPostsOfTripByDate(tempParams);
				setListTrip(data);
			} catch (error) {
				console.log('false to fetch product list :', error);
			}
		})();
	}, [queryParams]);

	console.log(listTrip);

	return (
		<div className="listTicketPage">
			<Infomation />
			<SeatMap />
		</div>
	);
}

export default ListTicketPage;
