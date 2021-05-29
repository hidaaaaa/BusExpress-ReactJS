import { Checkbox, Col, notification, Row } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../../../utils/formatMoney';
import { getListTicket } from '../../TransferSlice';
import './style/style.scss';

function SeatMap({ post = null, time = null }) {
	const [selectedTags, setSelectedTags] = useState([]);
	const dispatch = useDispatch();
	let tagsData = [...post];

	const handleChange = async (tag, checked) => {
		const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
		if (nextSelectedTags.length === 4) {
			return notification.open({
				message: 'Lỗi',
				description: 'chỉ được chọn tối đa 3 ghế!',
			});
		} else {
			setSelectedTags(nextSelectedTags);
			const action = getListTicket({
				time: time,
				tickets: nextSelectedTags,
			});
			dispatch(action);
		}
	};

	return (
		<Checkbox.Group className="seatMap">
			{time ? (
				<>
					<div className="seatMap__title">Sơ đồ ghế</div>
					<Row className="seatMap__row">
						{tagsData.map((tag, index) => {
							if (tag.choose === '1') {
								return (
									<Col span={8} key={index} className="seatMap__col">
										<CheckableTag className="seatMap__seat disable">{tag.code}</CheckableTag>
									</Col>
								);
							} else {
								return (
									<Col span={8} key={index} className="seatMap__col">
										<CheckableTag
											checked={selectedTags.indexOf(tag) > -1}
											onChange={(checked) => handleChange(tag, checked)}
											className="seatMap__seat"
										>
											{tag.code}
										</CheckableTag>
									</Col>
								);
							}
						})}
					</Row>

					<Row className="seatMap__seatStatuses">
						<Col span={6} offset={3} className="seatMap__seatStatus">
							<div className="seatMap__icon active"></div>
							Trống
						</Col>
						<Col span={6} className="seatMap__seatStatus">
							<div className="seatMap__icon select"></div>
							Đang Chọn
						</Col>
						<Col span={6} className="seatMap__seatStatus">
							<div className="seatMap__icon disable"></div>
							Đã Đặt
						</Col>

						<Col span={12} className="seatMap__seatStatus left">
							Ghế đã chọn : {selectedTags.length > 0 ? selectedTags.length : ''}
						</Col>
						<Col span={12} className="seatMap__seatStatus right">
							Thành tiền
						</Col>
						<Col span={12} className="seatMap__seatStatus left">
							{selectedTags.map((item, index) => `${item.code}${index < selectedTags.length - 1 ? ', ' : ''}`)}
						</Col>
						<Col span={12} className="seatMap__seatStatus right">
							{formatPrice(selectedTags.length * 200000)}
						</Col>
					</Row>
				</>
			) : (
				<>
					<Row className="seatMap__seatStatuses">
						<Col span={24} className="seatMap__seatStatus">
							Hãy chọn thời gian !!!
						</Col>
					</Row>
				</>
			)}
		</Checkbox.Group>
	);
}

export default SeatMap;
