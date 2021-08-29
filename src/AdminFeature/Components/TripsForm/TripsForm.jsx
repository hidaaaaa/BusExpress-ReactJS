import { Button, notification } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import ComboBoxField from 'components/ComboBoxField/ComboBoxField';
import DatePickerField from 'components/DatePickerField/DatePickerField';
import InputField from 'components/InputField/InputField';
import time from 'Data/time.json';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

function TripsForm({ MaCX, trips, onSubmit, type, buses = [], locations = [] }) {
	const [visible, setVisible] = useState(false);
	const tripsSelected = MaCX === '' ? '' : trips.find((item) => item.MaCX === MaCX);
	//console.log(tripsSelected);

	const form = useForm({
		defaultValues: useMemo(() => {
			return tripsSelected;
		}, [tripsSelected]),
	});

	const { reset } = form;

	useEffect(() => {
		reset(tripsSelected);
	}, [tripsSelected]);

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		form.reset();
		setVisible(false);
	};

	const handleSubmit = async (values) => {
		if (!!values.MaCX && !!values.NgayDi && !!values.BienSoXe && !!values.MaTX && !!values.GioDi) {
			if (
				type === 'create' &&
				trips.findIndex(
					(item) =>
						item.MaCX === values.MaCX &&
						item.BienSoXe === values.BienSoXe &&
						item.NgayDi === values.NgayDi &&
						item.MaTX === values.MaTX &&
						item.GioDi === values.GioDi
				) === -1
			) {
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
				{MaCX === '' ? 'Create' : 'Change'}
			</Button>
			<Modal visible={visible} onCancel={handleCancel} footer={null}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
					<div className="loginForm__title">{MaCX === '' ? 'Create' : 'Change'} Trip Info</div>

					<InputField form={form} name="MaCX" label="Trip ID" disabled={MaCX === '' ? false : true} />

					<ComboBoxField form={form} name="BienSoXe" label="License Plate" data={locations} />

					<ComboBoxField form={form} name="MaTX" label="Location Id" data={buses} />

					<div className={`inputField `}>
						<div className="inputField__title">Date Origin</div>
						<DatePickerField form={form} name="NgayDi" />
					</div>

					<ComboBoxField form={form} name="GioDi" label="Time Origin" data={time} />

					<button type="submit">{MaCX === '' ? 'Create' : 'Change'}</button>
				</form>
			</Modal>
		</>
	);
}

export default TripsForm;
