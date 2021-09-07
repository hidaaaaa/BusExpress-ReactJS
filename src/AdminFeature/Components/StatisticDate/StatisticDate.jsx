import { Button, Input, Table } from 'antd';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';

import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import { formatPrice } from 'utils/formatMoney';

function StatisticDate(props) {
	const { params } = useRouteMatch();
	// console.log(params);

	const [totalRevenue, setTotalRevenue] = useState([]);
	const [totalMoney, setTotalMoney] = useState(0);
	const [totalTicket, settotalTicket] = useState(0);
	const [valueEmail, setValueEmail] = useState('');
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const result = await busApi.getTotalRevenue();

				let total = 0;

				const temp = await result.filter((item) => formatDate(new Date(item.NgayDi)) === params.date);

				await temp.map((item) => (total = total + item.DonGia));

				await settotalTicket(temp.length);
				await setTotalMoney(total);
				await setTotalRevenue(temp);
				await setDataSource(temp);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [loading]);

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
					const filteredData = totalRevenue.filter((entry) => entry.Email.toLowerCase().includes(currValue));
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
	];

	return (
		<>
			<div className="total">
				<div className="total__revenue">revenue: {formatPrice(totalMoney)} </div>
				<div className="total__ticket">{totalTicket} tickets</div>
			</div>

			<div className="table" style={{ marginTop: '3.25rem' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<Button type="primary" danger>
							<Link to="/admin/statistic">Back</Link>
						</Button>
					</div>
					<div style={{ fontSize: '2rem' }}>LIST TICKETS </div>
					<div>
						<Button
							type="primary"
							danger
							onClick={() => {
								setValueEmail('');
								setDataSource(totalRevenue);
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
			</div>
		</>
	);
}

export default StatisticDate;
