import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, notification, Space, Table } from 'antd';
import authApi from 'api/authApi';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';

function TicketDetail(props) {
	const { params } = useRouteMatch();
	const [listTicket, setListTicket] = useState([]);
	const [valueEmail, setValueEmail] = useState('');
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const [ticketCancel, setTicketCancel] = useState({});
	const [isModalVisible, setIsModalVisible] = useState(false);
	const user = useSelector((state) => state.auth.current.rs);
	const [loadingDel, setLoadinDel] = useState(false);

	// console.log(params);

	useEffect(() => {
		(async () => {
			try {
				const postDetail = await busApi.getPostDetailed({ postID: params.MaCX });
				// console.log(formatDate(postDetail[0]?.NgayDi));
				if (postDetail.length > 0) {
					const data = await busApi.getPostByDateAndTime({
						date: formatDate(new Date(postDetail[0]?.NgayDi)),
						time: postDetail[0]?.GioDi,
						tripid: postDetail[0]?.MaTX,
					});
					// setListTicket(data);
					const ticketEmails = await busApi.getAllTicketEmail();

					const listItem = data.map((item) => {
						const index = ticketEmails.find((ticketEmail) => ticketEmail.MaVeXe === item.MaVeXe);
						return { ...item, ...index, GioDi: postDetail[0]?.GioDi, NgayDi: postDetail[0]?.NgayDi };
					});
					setListTicket(listItem);
					setDataSource(listItem);
					await setLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [loadingDel]);

	if (loading) {
		return <Loading />;
	}

	const FilterEmailInput = (
		<>
			<Input
				placeholder="Email"
				value={valueEmail}
				onChange={(e) => {
					const currValue = e.target.value.toLowerCase();
					setValueEmail(currValue);
					const filteredData = listTicket.filter((entry) => entry.Email.toLowerCase().includes(currValue));
					setDataSource(filteredData);
				}}
			/>
		</>
	);

	const columns = [
		{
			title: 'Ticket ID',
			dataIndex: 'MaVeXe',
			key: 'MaVeXe',
		},
		{
			title: 'Trip Id',
			dataIndex: 'MaCX',
			key: 'MaCX',
		},
		{
			title: 'Seat',
			dataIndex: 'SoGhe',
			key: 'Soghe',
		},
		{
			title: 'Date Booked',
			dataIndex: 'NgayDat',
			key: 'NgayDat',
			render: (NgayDat) => <>{formatDate(new Date(NgayDat))} </>,
		},
		{
			title: FilterEmailInput,
			dataIndex: 'Email',
			key: 'Email',
		},
		{
			title: (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>Action</div>
					{/* <TripsForm
						MaCX={''}
						trips={trips}
						onSubmit={handleChangeTrip}
						type="create"
						buses={buses}
						locations={locations}
					/> */}
				</div>
			),
			dataIndex: 'MaVeXe',
			key: 'MaVeXe',
			render: (MaVeXe) => {
				const currentDate = new Date();
				currentDate.setHours(0, 0, 0, 0);
				const index = listTicket.find((item) => item.MaVeXe === MaVeXe);
				let isCantDel = false;
				if (!!index) {
					const hoursT = parseInt(index.GioDi.split(':')[0]);

					// console.log('so sanh', currentDate.getTime() === new Date(index.NgayDi).getTime());
					if (currentDate.getTime() === new Date(index.NgayDi).getTime()) {
						// console.log('bang');
						if (new Date().getHours() <= hoursT - 4) {
							isCantDel = true;
						} else {
							isCantDel = false;
						}
					}
					if (currentDate.getTime() > new Date(index.NgayDi).getTime()) {
						// console.log('lon');
						isCantDel = false;
					}

					if (currentDate.getTime() < new Date(index.NgayDi).getTime()) {
						// console.log('be');
						isCantDel = true;
					}
				}

				return (
					<Space size="middle">
						<Button type="primary" danger onClick={() => handleCancelTicket(MaVeXe)} disabled={!isCantDel}>
							Delete
						</Button>
					</Space>
				);
			},
		},
	];

	const handleCancelTicket = async (MaVeXe) => {
		const today = formatDate(new Date());
		const ticket = {
			MaVeXe: MaVeXe,
			STK: '123456789',
			DonGia: 200000,
			NgayHuy: today,
			MaCX: params.MaCX,
			Email: user.Email,
		};
		setTicketCancel(ticket);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOk = async () => {
		setLoadinDel(true);
		try {
			console.log(ticketCancel);
			const rs = await authApi.cancelTicket(ticketCancel);
			console.log(rs);

			if (rs) {
				// const temp = listTicket.filter((item) => item.MaVeXe !== ticketCancel.MaVeXe);
				// console.log(temp);
				// setListTicket(temp);
				setIsModalVisible(false);
				setLoadinDel(false);
				return notification.success({
					message: 'Hủy vé thành công',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div>
					{' '}
					<Button type="primary" danger>
						<Link to="/admin/tickets">Back</Link>
					</Button>
				</div>
				<div style={{ fontSize: '2rem' }}>LIST TICKETS ( {params.MaCX} )</div>
				<div>
					<Button
						type="primary"
						danger
						onClick={() => {
							setValueEmail('');
							setDataSource(listTicket);
						}}
					>
						reset filter
					</Button>
				</div>
			</div>
			<Table
				dataSource={dataSource}
				pagination={{
					pageSize: 4,
					position: ['bottomCenter'],
				}}
				columns={columns}
				className="tableTicket"
				loading={loading}
			/>

			<Modal
				closable={false}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel} disabled={loadingDel}>
						Return
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						{loadingDel ? (
							<>
								<FontAwesomeIcon icon={faSpinner} className="loading-icon" /> Loading...
							</>
						) : (
							<>Delete</>
						)}
					</Button>,
				]}
			>
				<div>Confirm to Delete all tickets?</div>
			</Modal>
		</div>
	);
}

export default TicketDetail;
