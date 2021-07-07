import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, notification, Row, Select } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import busApi from 'api/busApi';
import React, { useEffect, useState } from 'react';
import LoadingSeat from './LoadingSeat';
import './style/listTicketPage.scss';

const { Option } = Select;

function ListTicketPage({ listTrip, buses, queryParams }) {
	const [selectedTags, setSelectedTags] = useState([]);
	const [filters, setFilters] = useState({ ...queryParams, time: listTrip[0].GioDi });
	const [post, setPost] = useState([]);

	const [loading, setLoading] = useState(true);
	let tagsData = [...post];

	useEffect(() => {
		(async () => {
			try {
				const data = await busApi.getPostByDateAndTime(filters);
				await setPost(data);
			} catch (error) {
				console.log('false to fetch  list transfer :', error);
			}
			setLoading(false);
		})();
	}, [filters]);

	const handleChooseTime = (value) => {
		if (value) {
			setFilters({
				...filters,
				time: value,
			});
		}
	};

	const handleChange = async (tag, checked) => {
		const index = selectedTags.findIndex((item) => item.id === filters.time);

		if (index < 0) {
			setSelectedTags([
				...selectedTags,
				{
					id: filters.time,
					tag: [tag],
				},
			]);
		} else {
			console.log(selectedTags[index].tag);
			const nextSelectedTags = checked
				? [...selectedTags[index].tag, tag]
				: selectedTags[index].tag.filter((t) => t.code !== tag.code);

			if (nextSelectedTags.length === 4) {
				return notification.open({
					message: 'Lỗi',
					description: 'chỉ được chọn tối đa 3 ghế!',
				});
			} else {
				const temp = [...selectedTags];

				temp[index].tag = nextSelectedTags;

				setSelectedTags(temp);
			}
		}
	};

	return (
		<div className="listTicketPage">
			<div className="listTicketPage__information information">
				<div className="information__date">{queryParams.date}</div>
				<div className="information__location">
					{buses[buses.findIndex((item) => item.MaTX === listTrip[0].MaTX)].DiemDi}
					<FontAwesomeIcon icon={faArrowAltCircleRight} />
					{buses[buses.findIndex((item) => item.MaTX === listTrip[0].MaTX)].DiemDen}
				</div>

				<div className="information__time">
					<Select
						size={`large`}
						bordered={false}
						defaultValue={listTrip[0].GioDi}
						onChange={handleChooseTime}
						className="selectDate"
					>
						{listTrip?.map((item) => (
							<Option key={item.MaCX} value={item.GioDi}>
								{item.GioDi}
							</Option>
						))}
					</Select>
				</div>
			</div>

			<div className="listTicketPage__seatMap seatMap">
				<div className="seatMap__title">SEAT MAP</div>

				{loading ? (
					<LoadingSeat />
				) : (
					<>
						<Row className="seatMap__row row">
							{tagsData.map((tag, index) => {
								if (tag.choose === '1') {
									return (
										<Col key={index} span={8} className="row__item item">
											<CheckableTag className="item__seat disable">{tag.code}</CheckableTag>
										</Col>
									);
								} else {
									const indexPos = selectedTags.findIndex((item) => item.id === filters.time);

									if (indexPos > -1) {
										return (
											<Col span={8} key={index} className="row__item">
												<CheckableTag
													checked={selectedTags[indexPos].tag.findIndex((e) => e.code === tag.code) > -1}
													onChange={(checked) => handleChange(tag, checked)}
													className="item__seat"
												>
													{tag.code}
												</CheckableTag>
											</Col>
										);
									} else {
										return (
											<Col span={8} key={index} className="row__item">
												<CheckableTag
													checked={false}
													onChange={(checked) => handleChange(tag, checked)}
													className="item__seat"
												>
													{tag.code}
												</CheckableTag>
											</Col>
										);
									}
								}
							})}
						</Row>
					</>
				)}
			</div>
		</div>
	);
}

export default ListTicketPage;
