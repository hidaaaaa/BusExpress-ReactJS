import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, notification, Space, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import authApi from 'api/authApi';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils/formatDate';

function BookedTickets({ bookedTickets }) {
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [listTicket, setListTickets] = useState([...bookedTickets]);
	const [ticketCancel, setTicketCancel] = useState({});

	const user = useSelector((state) => state.auth.current.rs);

	const columns = [
		{
			title: 'Ticket ID',
			dataIndex: 'MaVeXe',
			key: 'MaVeXe',
		},
		{
			title: 'License Plate',
			dataIndex: 'BienSoXe',
			key: 'BienSoXe',
		},
		{
			title: 'Seat',
			dataIndex: 'SoGhe',
			key: 'SoGhe',
		},
		{
			title: 'Date Booked',
			dataIndex: 'NgayDat',
			key: 'NgayDat',
		},
		{
			title: 'Date Origin',
			dataIndex: 'NgayDi',
			key: 'NgayDi',
			render: (NgayDi) => <>{formatDate(new Date(NgayDi))} </>,
		},
		{
			title: 'Time Origin',
			dataIndex: 'GioDi',
			key: 'GioDi',
		},
		{
			title: 'Action',
			dataIndex: 'MaVeXe',
			key: 'MaVeXe',
			render: (MaVeXe) => {
				const currentDate = new Date();
				currentDate.setHours(0, 0, 0, 0);
				const index = listTicket.find((item) => item.MaVeXe === MaVeXe);
				const hoursT = parseInt(index.GioDi.split(':')[0]);
				let isCantDel = false;
				if (currentDate === new Date(index.NgayDi)) {
					if (new Date().getHours() <= hoursT - 4) {
						isCantDel = true;
					} else {
						isCantDel = false;
					}
				}
				if (currentDate > new Date(index.NgayDi)) isCantDel = false;

				if (currentDate < new Date(index.NgayDi)) isCantDel = true;
				return (
					<Space size="middle">
						<Button type="text" danger onClick={() => handleCancelTicket(MaVeXe)} disabled={!isCantDel}>
							Delete
						</Button>
					</Space>
				);
			},
		},
	];

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOk = async () => {
		setLoading(true);
		try {
			console.log(ticketCancel);
			const rs = await authApi.cancelTicket(ticketCancel);
			console.log(rs);
			setLoading(false);
			if (rs.is) {
				const temp = bookedTickets.filter((item) => item.MaVeXe !== ticketCancel.MaVeXe);

				setListTickets(temp);
				setIsModalVisible(false);

				return notification.success({
					message: 'Hủy vé thành công',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelTicket = async (MaVeXe) => {
		const today = formatDate(new Date());
		const temp = bookedTickets.filter((item) => item.MaVeXe === MaVeXe);
		const ticket = {
			MaVeXe: MaVeXe,
			STK: '123456789',
			DonGia: 200000,
			NgayHuy: today,
			MaCX: temp[0].MaCX,
			Email: user.Email,
		};
		setTicketCancel(ticket);
		setIsModalVisible(true);
	};

	return (
		<div className="profile">
			<div className="profile__title">List tickets</div>

			<Table
				dataSource={listTicket}
				style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem' }}
				pagination={{
					position: ['bottomCenter'],
					pageSize: 3,
				}}
				columns={columns}
			/>

			<Modal
				closable={false}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel} disabled={loading}>
						Return
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						{loading ? (
							<>
								<FontAwesomeIcon icon={faSpinner} className="loading-icon" /> Loading...
							</>
						) : (
							<>Login</>
						)}
					</Button>,
				]}
			>
				<div>Confirm to Delete all tickets?</div>
			</Modal>
		</div>
	);
}

export default BookedTickets;
