import { Button, notification } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import InputField from 'components/InputField/InputField';
import LocationPickerField from 'components/LocationPickerField/LocationPickerField';
import NumberField from 'components/NumberField/NumberField';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

function LocationForm({ locations, MaTX, onSubmit, type }) {
	const locationSelected = MaTX === '' ? '' : locations.find((item) => item.MaTX === MaTX);
	const [location, setLocation] = useState(
		locationSelected === ''
			? { origin: '', destination: '' }
			: { origin: locationSelected.DiemDi, destination: locationSelected.DiemDen }
	);
	const [visible, setVisible] = useState(false);
	const form = useForm({
		defaultValues: useMemo(() => {
			return locationSelected;
		}, [locationSelected]),
	});

	const { reset } = form;

	useEffect(() => {
		reset(locationSelected);
	}, [locationSelected]);

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleOnchangeOrigin = (values) => {
		let temp = { ...location, origin: values };
		setLocation(temp);
	};

	const handleOnchangeDestination = (values) => {
		let temp = { ...location, destination: values };
		setLocation(temp);
	};

	const handleSubmit = async (values) => {
		console.log(values);
		if (!!values.MaTX && !!values.DiemDi && !!values.DiemDen && values.DonGia >= 200000 && !!values.DonGia) {
			const index = locations.findIndex((item) => item.DiemDi === values.DiemDi && item.DiemDen === values.DiemDen);

			if (index > -1) {
				return notification.error({
					message: 'Wrong',
					description: 'Invalid values',
				});
			} else {
				if (type === 'create' && locations.findIndex((item) => item.MaTX === values.MaTX) === -1) {
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
						message: 'Wrong',
						description: 'Invalid values',
					});
				}
			}
		} else {
			return notification.error({
				message: 'Wrong',
				description: 'Invalid values',
			});
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				{MaTX === '' ? 'Create' : 'Change'}
			</Button>
			<Modal visible={visible} onCancel={handleCancel} footer={null}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
					<div className="loginForm__title">{MaTX === '' ? 'Create' : 'Change'} Bus Info</div>

					<InputField form={form} name="MaTX" label="Trip ID" disabled={MaTX === '' ? false : true} />

					<NumberField form={form} name="DonGia" label="Price" />

					<LocationPickerField
						name="DiemDi"
						label="Origin"
						form={form}
						location={location}
						handle={handleOnchangeOrigin}
						defaultValue={locationSelected.DiemDi}
					/>

					<LocationPickerField
						name="DiemDen"
						label="Destination"
						form={form}
						location={location}
						handle={handleOnchangeDestination}
						defaultValue={locationSelected.DiemDen}
					/>

					{/* <ComboBoxField form={form} name="LoaiXe" label="Type" defaultValue={initialValues.LoaiXe} /> */}

					<button type="submit">{MaTX === '' ? 'Create' : 'Change'}</button>
				</form>
			</Modal>
		</>
	);
}

export default LocationForm;
