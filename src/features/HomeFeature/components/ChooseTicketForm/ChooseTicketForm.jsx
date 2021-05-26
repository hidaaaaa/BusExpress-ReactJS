import SwapOutlined from '@ant-design/icons/SwapOutlined';
import { Button, notification, Radio } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePickerField from '../../../../components/DatePickerField/DatePickerField';
import PickedLocationField from '../../../../components/PickedLocationField/PickedLocationField';
import './styles/styles.scss';

ChooseTicketForm.propTypes = {};

// const schema = yup.object().shape({
// 	DiemDi: yup.string().required('Please enter your origin'),
// 	DiemDen: yup.string().required('Please enter your destination'),
// });

function ChooseTicketForm({ onSubmit = null }) {
	const form = useForm({
		defaultValues: {
			DiemDi: '',
			DiemDen: '',
			isRoundTrip: false,
		},
	});
	const [radioValue, setRadioValue] = useState(false);

	const handleSubmit = async (values) => {
		if (values.DiemDi === values.DiemDen) {
			return notification.open({
				message: 'Lỗi',
				description: 'Điểm đi và điểm đến không thể trùng',
			});
		}

		if (values.DiemDi === '' || values.DiemDen === '') {
			return notification.open({
				message: 'Lỗi',
				description: 'Điểm đi và điểm đến không thể trống',
			});
		}
		if (onSubmit) {
			await onSubmit(values);
		}
	};

	const handleRadioClick = (value) => {
		setRadioValue(value.target.value);
	};

	return (
		<>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="chooseTicketForm">
				<Controller
					name="isRoundTrip"
					control={form.control}
					render={({ field: { onChange, onBlur, value, name, ref } }) => (
						<Radio.Group
							ref={ref}
							name={name}
							value={value}
							onChange={(value) => {
								onChange(value);
								handleRadioClick(value);
							}}
							onBlur={onBlur}
						>
							<Radio value={false}>Một Chiều</Radio>
							<Radio value={true}>Cứ hồi</Radio>
						</Radio.Group>
					)}
				/>

				<div className="chooseTicketForm__group">
					<div className="chooseTicketForm__groupLocation">
						<PickedLocationField name="DiemDi" label="Điếm đi" form={form} />
						<div className="chooseTicketForm__icon">
							<SwapOutlined className="chooseTicketForm__icon-item" />
						</div>
						<PickedLocationField name="DiemDen" label="Điếm đến" form={form} />
					</div>

					<div className="chooseTicketForm__groupDatePicker">
						<div className="chooseTicketForm__datePicker">
							<div className="chooseTicketForm__title">Ngày đi</div>
							<DatePickerField name="departureDate" label="Ngày đi" form={form} />
						</div>

						<div className={`chooseTicketForm__datePicker ${radioValue === false ? 'disable' : ''} `}>
							<div className="chooseTicketForm__title">Ngày về</div>
							<DatePickerField name="returnDate" label="Ngày về" form={form} />
						</div>
					</div>
				</div>

				<div className="chooseTicketForm__btn">
					<Button size="large" htmlType="submit">
						Tìm Chuyến Xe
					</Button>
				</div>
			</form>
		</>
	);
}

export default ChooseTicketForm;
