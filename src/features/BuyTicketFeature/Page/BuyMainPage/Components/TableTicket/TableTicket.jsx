import { Button, DatePicker, Input, Space, Table } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import { formatPrice } from 'utils/formatMoney';
import './style/tableTicket.scss';

function TableTicket({ listBuses }) {
	const [dataSource, setDataSource] = useState(listBuses);

	const [valueLocation, setValueLocation] = useState('');
	const [valueDate, setValueDate] = useState(null);

	const FilterByLocationInput = (
		<>
			<Input
				placeholder="Location"
				value={valueLocation}
				onChange={(e) => {
					const currValue = e.target.value.toLowerCase();
					setValueLocation(currValue);
					const filteredData = listBuses.filter(
						(entry) => entry.DiemDi.toLowerCase().includes(currValue) || entry.DiemDen.toLowerCase().includes(currValue)
					);
					setDataSource(filteredData);
				}}
			/>
		</>
	);

	const FilterByDateInput = (
		<DatePicker
			placeholder="Date Origin"
			value={valueDate}
			onChange={(e) => {
				console.log(e);
				const currValue = e;
				setValueDate(currValue);
				const filteredData = listBuses.filter(
					(entry) => formatDate(new Date(entry.NgayDi)) === formatDate(new Date(currValue._d))
				);
				setDataSource(filteredData);
			}}
		/>
	);

	const columns = [
		{
			title: FilterByLocationInput,
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
			title: FilterByDateInput,
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
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div></div>
				<div style={{ fontSize: '2rem' }}>LIST TICKETS</div>
				<div>
					<Button
						type="primary"
						danger
						onClick={() => {
							setValueDate(null);
							setValueLocation('');
							setDataSource(listBuses);
						}}
					>
						reset filter
					</Button>
				</div>
			</div>
			<Table
				dataSource={dataSource}
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
