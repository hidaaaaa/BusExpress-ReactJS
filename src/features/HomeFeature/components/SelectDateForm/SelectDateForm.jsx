import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';
import DatePickerField from 'components/DatePickerField/DatePickerField';
import LocationPickerField from 'components/LocationPickerField/LocationPickerField';
import useWindowSize from 'CoustomHook/useWindowsSize';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/selectDateForm.scss';

function SelectDateForm({ onSubmit = null, loading = true }) {
	const [width] = useWindowSize();
	const [location, setLocation] = useState({ origin: '', destination: '' });

	const form = useForm({
		defaultValues: {
			DiemDi: '',
			DiemDen: '',
		},
	});

	const handleSubmit = async (values) => {
		if (values.DiemDi === '' || values.DiemDen === '') {
			return notification.open({
				message: 'Error',
				description: 'The date of departure and return cannot be the same',
			});
		}

		if (onSubmit) {
			await onSubmit(values);
		}
	};

	const handleOnchangeOrigin = (values) => {
		let temp = { ...location, origin: values };
		setLocation(temp);
	};

	const handleOnchangeDestination = (values) => {
		let temp = { ...location, destination: values };
		setLocation(temp);
	};

	const handleChangeLocaiton = () => {
		console.log('ok');
		const des = location.destination;
		const ori = location.origin;
		let temp = { ...location, origin: des, destination: ori };
		setLocation(temp);
	};
	return (
		<>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="SelectDateForm">
				<div className="SelectDateForm__title">Find a trip</div>
				<div className="SelectDateForm__group group">
					<div className="group__item">
						<LocationPickerField
							name="DiemDi"
							label="Origin"
							form={form}
							width={width}
							location={location}
							handle={handleOnchangeOrigin}
						/>
						<div className="icon" onClick={handleChangeLocaiton}>
							<FontAwesomeIcon icon={faSyncAlt} className="SelectDateForm__icon-item" />
						</div>
						<LocationPickerField
							name="DiemDen"
							label="Destination"
							form={form}
							width={width}
							location={location}
							handle={handleOnchangeDestination}
						/>
					</div>

					<div className="group__item item">
						<DatePickerField name="departureDate" label="Ngày đi" form={form} width={width} />
					</div>
				</div>

				<div className={`SelectDateForm__btn `}>
					<button className={loading ? 'disable' : 'active'} type="submit">
						Find Now
					</button>
				</div>
			</form>
		</>
	);
}

export default SelectDateForm;
