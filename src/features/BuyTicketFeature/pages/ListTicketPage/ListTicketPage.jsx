import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import listPostApi from '../../../../api/listPostApi';
import locationAPI from '../../../../api/locationApi';
import Information from '../../Components/Infomation/Information';
import SeatMap from '../../Components/SeatMap/SeatMap';
import { pushListTransfer } from '../../TransferSlice';
import './style/style.scss';

function ListTicketPage({ queryParams }) {
	const dispatch = useDispatch();

	const [filters, setFilters] = useState({ ...queryParams });
	const [postList, setPostList] = useState([]);
	const [post, setPost] = useState([]);
	const [time, setTime] = useState(null);
	useEffect(() => {
		(async () => {
			try {
				const data = await locationAPI.getPostsOfTripByDate(queryParams);
				setPostList(data);
				const action = pushListTransfer(data);
				dispatch(action);
			} catch (error) {
				console.log('false to fetch product list :', error);
			}
		})();
	}, [queryParams, dispatch]);

	useEffect(() => {
		(async () => {
			try {
				const data = await listPostApi.getPostByDateAndTime(filters);
				await setPost(data);
			} catch (error) {
				console.log('false to fetch product list :', error);
			}
		})();
	}, [filters, dispatch]);

	const handleChooseTime = (value) => {
		if (value) {
			setTime(value);
			setFilters({
				...filters,
				time: value,
			});
		}
	};

	return (
		<div className="listTicketPage">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<div className="listTicketPage__item">
						<Information listTrip={postList} onSubmit={handleChooseTime} date={queryParams.date} />
					</div>
				</Col>
				<Col md={{ span: 12 }}>
					<div className="listTicketPage__item">
						<SeatMap post={post} time={time} />
					</div>
				</Col>
				<Col md={{ span: 12 }}></Col>
			</Row>
		</div>
	);
}

export default ListTicketPage;
