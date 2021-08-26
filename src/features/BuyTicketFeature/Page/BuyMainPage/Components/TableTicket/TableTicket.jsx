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
			dataIndex: 'infoTrip',
			key: 'infoTrip',
			render: (infoTrip) => {
				return (
					<Space size="middle">
						<Button
							type="text"
							style={{ fontSize: '1.5rem', color: '#ffffff' }}
							onClick={() => handleBookTicket(infoTrip)}
						>
							Buy Ticket
						</Button>
					</Space>
				);
			},
		},
	];
	const history = useHistory();
	//console.log(listBuses);

	const handleBookTicket = (infoTrip) => {
		//const choose = listBuses.find((item) => item.MaTX === MaVeXe);
		//console.log(infoTrip);
		history.push(
			`/home/buy?tripid=${infoTrip.tripId}&date=${formatDate(new Date(infoTrip.date))}&time=${infoTrip.time}&step=1`
		);
	};

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
			<Table
				dataSource={listBuses}
				style={{}}
				pagination={{
					pageSize: 6,
					position: ['bottomCenter'],
				}}
				columns={columns}
				className="tableTicket"
			/>
		</div>
	);
}

export default TableTicket;
