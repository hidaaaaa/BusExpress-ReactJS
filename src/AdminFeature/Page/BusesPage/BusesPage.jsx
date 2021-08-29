import BusesForm from 'AdminFeature/Components/BusesForm/BusesForm';
import { notification, Table } from 'antd';
import busApi from 'api/busApi';
import React, { useEffect, useState } from 'react';

function BusesPage(props) {
	const [buses, setBuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const handleChangeBus = async (values) => {
		// call api change
		console.log(values);
		if (values.type === 'change') {
			try {
				const result = await busApi.changeBus(values);
				if (result.isAdded) {
					const temp = buses;
					temp[temp.findIndex((item) => item.BienSoXe === values.BienSoXe)] = {
						BienSoXe: values.BienSoXe,
						LoaiXe: values.LoaiXe,
						SoLuongGhe: values.SoLuongGhe,
					};
					setBuses(temp);
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
				const result = await busApi.createBus(values);
				if (result.isAdded) {
					const temp = buses;
					setBuses([...temp, { BienSoXe: values.BienSoXe, LoaiXe: values.LoaiXe, SoLuongGhe: values.SoLuongGhe }]);
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
			title: 'License Plate',
			dataIndex: 'BienSoXe',
			key: 'BienSoXe',
		},
		{
			title: 'Type',
			dataIndex: 'LoaiXe',
			key: 'LoaiXe',
		},
		{
			title: 'Number of seats',
			dataIndex: 'SoLuongGhe',
			key: 'SoLuongGhe',
		},
		{
			title: (
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>Action</div>
					<BusesForm BienSoXe={''} buses={buses} onSubmit={handleChangeBus} type="create" />
				</div>
			),
			dataIndex: 'BienSoXe',
			key: 'BienSoXe',
			render: (BienSoXe) => {
				return <BusesForm BienSoXe={BienSoXe} buses={buses} onSubmit={handleChangeBus} type="change" />;
			},
		},
	];

	useEffect(() => {
		(async () => {
			try {
				//const rs = await busApi.getAll();
				const rs2 = await busApi.getBuses();

				await setBuses(rs2);

				await setLoading(false);
			} catch (error) {}
		})();
	}, [loading]);

	return (
		<div className="table" style={{ marginTop: '3.25rem' }}>
			<Table
				dataSource={buses}
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

export default BusesPage;
