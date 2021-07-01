import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { Controller } from 'react-hook-form';
import './styles/datePickerField.scss';

DatePickerField.propTypes = {};

function DatePickerField(props) {
	const { form, name } = props;
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field: { onChange, onBlur, value, name, ref } }) => (
				<DatePicker
					size={'large'}
					ref={ref}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className="datePickerField"
					disabledDate={(current) => {
						return moment().add(-1, 'days') >= current;
					}}
				/>
			)}
		/>
	);
}

export default DatePickerField;
