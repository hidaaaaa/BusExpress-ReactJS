import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, notification, Row, Select } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import busApi from 'api/busApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListTicket } from '../../ticketSlice';
import LoadingSeat from './LoadingSeat';
import './style/listTicketPage.scss';

const { Option } = Select;

function ListTicketPage({ listTrip, buses, queryParams, handleSumitPrev, handleSumitNext }) {
	const dispatch = useDispatch();
	const tickets = useSelector((state) => state.tickets.tickets);
	const [positon, setPositon] = useState(true);
	const [selectedTags, setSelectedTags] = useState(
		tickets.tickets === undefined ? [] : [{ ...tickets.tickets, tag: [...tickets.tickets.tag] }]
	);
	const [filters, setFilters] = useState({
		...queryParams,
		time: queryParams.time !== '' ? queryParams.time : listTrip[0].GioDi,
	});
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);
	let tagsData = [...post];

	//console.log(filters);

	useEffect(() => {
		(async () => {
			try {
				const data = await busApi.getPostByDateAndTime(filters);
				const bus = listTrip.findIndex((item) => item.GioDi === filters.time);
				const postDetailed = await busApi.getPostDetailed({ postID: listTrip[bus].MaCX });

				//console.log(data);
				const seats = [];
				if (postDetailed[0].LoaiXe === 'BUS') {
					Array(postDetailed[0].SoLuongGhe)
						.fill(null)
						.map((e, i) => {
							seats.push({
								code: `A${i + 1}`,
								choose: '0',
							});
						});
				} else {
					Array(postDetailed[0].SoLuongGhe)
						.fill(null)
						.map((e, i) => {
							seats.push({
								code: `A${i + 1}`,
								choose: '0',
							});
						});

					Array(postDetailed[0].SoLuongGhe)
						.fill(null)
						.map((e, i) => {
							seats.push({
								code: `B${i + 1}`,
								choose: '0',
							});
						});
				}

				data.map((e) => {
					if (seats.findIndex((item) => item.code === e.SoGhe) > -1) {
						seats[seats.findIndex((item) => item.code === e.SoGhe)].choose = '1';
					}
				});

				setPost(seats);
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
					writable: true,
				},
			]);
		} else {
			const nextSelectedTags = checked
				? [...selectedTags[index].tag, tag]
				: selectedTags[index].tag.filter((t) => t.code !== tag.code);

			if (nextSelectedTags.length === 4) {
				return notification.error({
					message: 'Error!!!',
					description: 'just can choose 3 tickets',
				});
			} else {
				const temp = [...selectedTags];
				Object.defineProperty(temp[index], 'tag', {
					writable: true,
				});
				temp[index].tag = nextSelectedTags;

				setSelectedTags(temp);
			}
		}
	};

	const handleClickPrev = async () => {
		if (handleSumitPrev) {
			await handleSumitPrev({ step: queryParams.step });
		}
	};

	const handleClickNext = async () => {
		if (handleSumitNext) {
			if (selectedTags.length > 0) {
				const index = selectedTags.findIndex((item) => item.id === filters.time);
				if (index >= 0) {
					if (selectedTags[index].tag.length > 0) {
						const action = await getListTicket({
							tickets: selectedTags[index],
							date: queryParams.date,
							tripid: queryParams.tripid,
						});
						dispatch(action);
						await handleSumitNext({ step: queryParams.step });
					} else {
						return notification.error({
							message: 'Error!!!',
							description: 'you not choose any tickets',
						});
					}
				} else {
					return notification.error({
						message: 'Error!!!',
						description: 'you not choose any tickets',
					});
				}
			} else {
				return notification.error({
					message: 'Error!!!',
					description: 'you not choose any tickets',
				});
			}
		}
	};

	return (
		<>
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
							defaultValue={queryParams.time !== '' ? queryParams.time : listTrip[0].GioDi}
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
							{tagsData.length > 50 ? (
								<>
									<div className="button" style={{ paddingBottom: '1rem' }}>
										{positon ? (
											<div className="seatMap__title">downstairs </div>
										) : (
											<div className="seatMap__title">upstairs</div>
										)}

										<Button type="primary" danger onClick={() => setPositon(!positon)}>
											Change stairs
										</Button>
									</div>

									{positon ? (
										<Row className="seatMap__row row">
											{tagsData.map((tag, index) => {
												if (tag.code.indexOf('A') > -1) {
													if (tag.choose === '1') {
														return (
															<Col key={index} span={6} className="row__item item">
																<CheckableTag className="item__seat disable">{tag.code}</CheckableTag>
															</Col>
														);
													} else {
														const indexPos = selectedTags.findIndex((item) => item.id === filters.time);

														if (indexPos > -1) {
															return (
																<Col span={6} key={index} className="row__item">
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
																<Col span={6} key={index} className="row__item">
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
												}
											})}
										</Row>
									) : (
										<Row className="seatMap__row row">
											{tagsData.map((tag, index) => {
												if (tag.code.indexOf('B') > -1) {
													if (tag.choose === '1') {
														return (
															<Col key={index} span={6} className="row__item item">
																<CheckableTag className="item__seat disable">{tag.code}</CheckableTag>
															</Col>
														);
													} else {
														const indexPos = selectedTags.findIndex((item) => item.id === filters.time);

														if (indexPos > -1) {
															return (
																<Col span={6} key={index} className="row__item">
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
																<Col span={6} key={index} className="row__item">
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
												}
											})}
										</Row>
									)}
								</>
							) : (
								<>
									<Row className="seatMap__row row">
										{tagsData.map((tag, index) => {
											if (tag.code.indexOf('A') > -1) {
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
											}
										})}
									</Row>
								</>
							)}
						</>
					)}
				</div>
			</div>

			<div className="button">
				<div className="button__prev" onClick={handleClickPrev}>
					Back
				</div>

				<div className="button__next" onClick={handleClickNext}>
					Next
				</div>
			</div>
		</>
	);
}

export default ListTicketPage;
