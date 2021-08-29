import TripsForm from 'AdminFeature/Components/TripsForm/TripsForm';
import { notification, Table } from 'antd';
import busApi from 'api/busApi';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { formatDate } from 'utils/formatDate';

function TripsPage(props) {
	const [trips, setTrips] = useState([]);
	const [buses, setBuses] = useState([]);
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleChangeTrip = async (values) => {
		// call api change
		values = { ...values, NgayDi: formatDate(values.NgayDi._d) };
		if (values.type === 'change') {
			try {
				const result = await busApi.changePost(values);
				if (result.isAdded) {
					setLoading(true);
					return notification.success({
						message: 'Add success!!!',
					});
				} else {
					return notification.error({
						message: 'Add fail',
					});
				}
			} catch (error) {}
		} else {
			try {
				const result = await busApi.createPost(values);
				if (result.isAdded) {
					setLoading(true);
					return notification.success({
						message: 'Add success!!!',
					});
				} else {
					return notification.error({
						message: 'Add fail',
					});
				}
			} catch (error) {}
		}
	};

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
					<TripsForm
						MaCX={''}
						trips={trips}
						onSubmit={handleChangeTrip}
						type="create"
						buses={buses}
						locations={locations}
					/>
				</div>
			),
			dataIndex: 'MaCX',
			key: 'MaCX',
			render: (MaCX) => {
				return (
					<TripsForm
						MaCX={MaCX}
						trips={trips}
						onSubmit={handleChangeTrip}
						type="change"
						buses={buses}
						locations={locations}
					/>
				);
			},
		},
	];

	useEffect(() => {
		(async () => {
			try {
				const rsTrip = await busApi.getAllBuses();
				const rsBus = await busApi.getAll();
				const rsLocation = await busApi.getBuses();

				const tempTrip = rsTrip.map((item) => (item = { ...item, NgayDi: moment(item.NgayDi) }));
				const tempBus = rsBus.map((item) => (item = { value: item.MaTX, name: item.MaTX }));
				const templocation = rsLocation.map((item) => (item = { value: item.BienSoXe, name: item.BienSoXe }));

				await setTrips(tempTrip);
				await setBuses(tempBus);
				await setLocations(templocation);

				await setLoading(false);
			} catch (error) {}
		})();
	}, [loading]);

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
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
		</div>
	);
}

export default TripsPage;
