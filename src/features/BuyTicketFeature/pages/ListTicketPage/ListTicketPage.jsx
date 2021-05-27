import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import locationAPI from '../../../../api/locationApi';
import Information from '../../Components/Infomation/Information';
import SeatMap from '../../Components/SeatMap/SeatMap';
import { pushListTransfer } from '../../TransferSlice';
import './style/style.scss';

function ListTicketPage({ queryParams }) {
	const dispatch = useDispatch();
	const [postList, setPostList] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const data = await locationAPI.getPostsOfTripByDate(queryParams);
				await setPostList(data);
				const action = pushListTransfer(data);
				dispatch(action);
			} catch (error) {
				console.log('false to fetch product list :', error);
			}

			setLoading(false);
		})();
	}, [queryParams, dispatch]);

	return (
		<div className="listTicketPage">
			<Row gutter={{ sm: 8 }}>
				<Col className="gutter-row" span={12}>
					<div className="listTicketPage__item">
						<Information listTrip={postList} />
					</div>
				</Col>
				<Col className="gutter-row" span={12}>
					<div className="listTicketPage__item">
						<SeatMap />
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default ListTicketPage;
