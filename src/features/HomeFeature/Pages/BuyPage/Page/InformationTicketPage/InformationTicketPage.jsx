import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InformationForm from '../../Component/InformationForm';
import './style/informationTicketPage.scss';

function InformationTicketPage({ buses, listTrip, handleSumitPrev, handleSumitNext, queryParams }) {
	const loggedInUser = useSelector((state) => state.auth.current.rs);
	const tickets = useSelector((state) => state.tickets.tickets.tickets);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleOk = async () => {
		setIsModalVisible(false);
		if (handleSumitNext) {
			const maCXPos = listTrip.findIndex((item) => item.GioDi === tickets.id);
			const maCX = listTrip[maCXPos].MaCX;

			const temp = {
				...information,
				MaCX: maCX,
				NgayDat: queryParams.date,
				Email: loggedInUser.Email,
				GioiTinh: information.GioiTinh,
				DonGia: buses[buses.findIndex((item) => item.MaTX === queryParams.tripid)].DonGia,
			};
			await handleSumitNext({ step: queryParams.step, informationPayment: temp });
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const [information, setInformation] = useState({
		SLGhe: tickets.tag.map((item) => item.code),
		TenKH: loggedInUser.TenKH,
		SDT: loggedInUser.SDT,
		DiaChi: loggedInUser.DiaChi,
		GioiTinh: loggedInUser.GioiTinh,
	});

	const handleSubmit = (values) => {
		setInformation(values);
	};

	const handleClickPrev = async () => {
		if (handleSumitPrev) {
			await handleSumitPrev({ step: queryParams.step });
		}
	};

	const handleClickNext = async () => {
		setIsModalVisible(true);
	};

	return (
		<div className="infomationTicketPage">
			<ul className="infomationTicketPage__list">
				{tickets.tag.map((item, index) => (
					<li key={index} className="infomationTicketPage__item">
						<div className="item">
							<div className="item__title">
								From : {buses[buses.findIndex((item) => item.MaTX === listTrip[0].MaTX)].DiemDi}
								<FontAwesomeIcon icon={faArrowAltCircleRight} />
								{buses[buses.findIndex((item) => item.MaTX === listTrip[0].MaTX)].DiemDen}
							</div>

							<div className="item__time">time: {tickets.id}</div>
							<div className="item__seat">seat: {item.code}</div>
						</div>

						<div className="item">
							<div className="item__title">INFORMATION</div>
							<div className="item__name">Name: {information.TenKH}</div>
							<div className="item__phone">Phone: {information.SDT}</div>
							<div className="item__address">Address: {information.DiaChi}</div>
							<InformationForm information={information} ticket={item} handleSubmit={handleSubmit} />
						</div>
					</li>
				))}
			</ul>
			<div className="button">
				<div className="button__prev" onClick={handleClickPrev}>
					Back
				</div>

				<div className="button__next" onClick={handleClickNext}>
					Next
				</div>
			</div>

			<Modal
				closable={false}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Return
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						Submit
					</Button>,
				]}
			>
				<div>Confirm to checkout all tickets?</div>
			</Modal>
		</div>
	);
}

export default InformationTicketPage;
