import LocationForm from 'AdminFeature/Components/LocationForm/LocationForm';
import { notification, Table } from 'antd';
import busApi from 'api/busApi';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { formatPrice } from 'utils/formatMoney';

function LocationPage(props) {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				//const rs = await busApi.getAll();
				const rs2 = await busApi.getAll();

				await setLocations(rs2);

				await setLoading(false);
			} catch (error) {}
		})();
	}, []);

	const handleChangeLocation = async (values) => {
		// call api change
		if (values.type === 'change') {
			try {
				const result = await busApi.changeTrip(values);
				if (result.isAdded) {
					const temp = locations;
					temp[temp.findIndex((item) => item.MaTX === values.MaTX)] = {
						MaTX: values.MaTX,
						DiemDi: values.DiemDi,
						DiemDen: values.DiemDen,
						DonGia: values.DonGia,
					};
					setLocations(temp);
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
				const result = await busApi.createTrip(values);
				if (result.isAdded) {
					const temp = locations;
					setLocations([
						...temp,
						{ MaTX: values.MaTX, DiemDi: values.DiemDi, DiemDen: values.DiemDen, DonGia: values.DonGia },
					]);
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
			title: 'Trip ID	',
			dataIndex: 'MaTX',
			key: 'MaTX',
		},
		{
			title: 'Origin',
			dataIndex: 'DiemDi',
			key: 'DiemDi',
		},
		{
			title: 'Destination',
			dataIndex: 'DiemDen',
			key: 'DiemDen',
		},
		{
			title: 'Price',
			dataIndex: 'DonGia',
			key: 'DonGia',
			render: (DonGia) => formatPrice(DonGia),
		},
		{
			title: (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>Action</div>
					<LocationForm MaTX={''} locations={locations} onSubmit={handleChangeLocation} type="create" />
				</div>
			),
			dataIndex: 'MaTX',
			key: 'MaTX',
			render: (MaTX) => {
				return <LocationForm MaTX={MaTX} locations={locations} onSubmit={handleChangeLocation} type="change" />;
			},
		},
	];

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
			<Table
				dataSource={locations}
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

export default LocationPage;
