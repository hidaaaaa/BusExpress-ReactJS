import { Button, Modal, notification } from 'antd';
import ComboBoxField from 'components/ComboBoxField/ComboBoxField';
import InputField from 'components/InputField/InputField';
import NumberField from 'components/NumberField/NumberField';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

function BusesForm({ onSubmit, BienSoXe, buses, type }) {
	const [visible, setVisible] = useState(false);
	const bus = BienSoXe === '' ? '' : buses.find((item) => item.BienSoXe === BienSoXe);

	const form = useForm({
		defaultValues: useMemo(() => {
			return bus;
		}, [bus]),
	});

	const { reset } = form;

	useEffect(() => {
		reset(bus);
	}, [bus]);

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleSubmit = async (values) => {
		if (!!values.BienSoXe && !!values.LoaiXe && values.SoLuongGhe > 10 && !!values.SoLuongGhe) {
			if (type === 'create' && buses.findIndex((item) => item.BienSoXe === values.BienSoXe) === -1) {
				if (onSubmit) {
					await onSubmit({ ...values, type });
					form.reset();
					setVisible(false);
				}
			} else if (type === 'change') {
				if (onSubmit) {
					await onSubmit({ ...values, type });
					form.reset();
					setVisible(false);
				}
			} else {
				return notification.error({
					message: 'Wrong credentials 1',
					description: 'Invalid values',
				});
			}
		} else {
			return notification.error({
				message: 'Wrong credentials 1',
				description: 'Invalid values',
			});
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				{BienSoXe === '' ? 'Create' : 'Change'}
			</Button>
			<Modal visible={visible} onCancel={handleCancel} footer={null}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
					<div className="loginForm__title">{BienSoXe === '' ? 'Create' : 'Change'} Bus Info</div>

					<InputField form={form} name="BienSoXe" label="License Plate" disabled={BienSoXe === '' ? false : true} />

					<ComboBoxField
						form={form}
						name="LoaiXe"
						label="Type"
						data={[
							{ value: 'BUS', name: 'BUS' },
							{ value: 'Xe Du Lịch', name: 'Xe Du Lịch' },
						]}
					/>

					<NumberField form={form} name="SoLuongGhe" label="Number of seats" />

					{/* <ComboBoxField form={form} name="LoaiXe" label="Type" defaultValue={initialValues.LoaiXe} /> */}

					<button type="submit">{BienSoXe === '' ? 'Create' : 'Change'}</button>
				</form>
			</Modal>
		</>
	);
}

export default BusesForm;
