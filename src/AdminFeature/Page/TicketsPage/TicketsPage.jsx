import busApi from 'api/busApi';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { formatDate } from 'utils/formatDate';
import { Button, Table } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import TicketDetail from 'AdminFeature/Components/TicketDetail/TicketDetail';

function TicketsPage(props) {
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const rsTrip = await busApi.getAllBuses();
				// const rsBus = await busApi.getAll();
				// const rsLocation = await busApi.getBuses();

				const tempTrip = rsTrip.map((item) => (item = { ...item, NgayDi: moment(item.NgayDi) }));
				// const tempBus = rsBus.map((item) => (item = { value: item.MaTX, name: item.MaTX }));
				// const templocation = rsLocation.map((item) => (item = { value: item.BienSoXe, name: item.BienSoXe }));

				await setTrips(tempTrip);
				// await setBuses(tempBus);
				// await setLocations(templocation);

				await setLoading(false);
			} catch (error) {}
		})();
	}, [loading]);

	const columns = [
		{
			title: 'Trip Id',
			dataIndex: 'MaCX',
			key: 'MaCX',
			render: (location) => <>{location}</>,
		},
		{
			title: 'License Plate',
			dataIndex: 'BienSoXe',
			key: 'BienSoXe',
		},
		{
			title: 'Location Id',
			dataIndex: 'MaTX',
			key: 'MaTX',
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
			dataIndex: 'MaCX',
			key: 'MaCX',
			render: (MaCX) => {
				return (
					<>
						<Button>
							<Link to={`/admin/tickets/${MaCX}`}>View Tickets</Link>
						</Button>
						{/* // <TripsForm
						MaCX={MaCX}
						trips={trips}
						onSubmit={handleChangeTrip}
						type="change"
						buses={buses}
						locations={locations}
					/> */}
					</>
				);
			},
		},
	];

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
			<Switch>
				<Route path="/admin/tickets" exact>
					<Table
						dataSource={trips}
						pagination={{
							pageSize: 4,
							position: ['bottomCenter'],
						}}
						columns={columns}
						className="tableTicket"
						loading={loading}
					/>
				</Route>

				<Route path="/admin/tickets/:MaCX">
					<TicketDetail />
				</Route>
			</Switch>
		</div>
	);
}

export default TicketsPage;
