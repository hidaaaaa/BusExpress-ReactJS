import { Button, Space, Table } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import { formatPrice } from 'utils/formatMoney';
import './style/tableTicket.scss';

function TableTicket({ listBuses }) {
	const columns = [
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location',
			render: (location) => <>{location}</>,
		},
		{
			title: 'License Plate',
			dataIndex: 'BienSoXe',
			key: 'BienSoXe',
		},
		{
			title: 'Price',
			dataIndex: 'DonGia',
			key: 'DonGia',
			render: (DonGia) => <>{formatPrice(DonGia)}</>,
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
			dataIndex: 'MaTX',
			key: 'MaTX',
			render: (MaTX) => {
				// const index = listBuses[lis]

				// const isChecked =

				return (
					<Space size="middle">
						<Button type="text" style={{ fontSize: '1.5rem', color: '#ffffff' }} onClick={() => handleBookTicket(MaTX)}>
							Buy Ticket
						</Button>
					</Space>
				);
			},
		},
	];
	const history = useHistory();
	//console.log(listBuses);

	const handleBookTicket = (MaVeXe) => {
		const choose = listBuses.find((item) => item.MaTX === MaVeXe);
		console.log(choose);
		history.push(`/home/buy?tripid=${choose.MaTX}&date=${formatDate(new Date(choose.NgayDi))}&step=1`);
	};

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
			<Table
				dataSource={listBuses}
				style={{
					overflowX: 'auto',
					backgroundColor: 'rgba(255, 255, 255, 0.2)',
					borderRadius: '10px',
					padding: '1rem 1rem 0 1rem',
				}}
				pagination={{
					pageSize: 6,
					position: ['bottomCenter'],
				}}
				columns={columns}
			/>
		</div>
	);
}

export default TableTicket;
