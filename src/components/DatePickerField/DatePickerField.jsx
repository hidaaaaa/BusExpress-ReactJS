import { DatePicker } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

function DatePickerField(props) {
	const { form, name } = props;
	// const {
	// 	formState: { errors },
	// } = form;
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field: { onChange, onBlur, value, name, ref } }) => (
				<DatePicker ref={ref} name={name} value={value} onChange={onChange} onBlur={onBlur} />
			)}
		/>
	);
}

export default DatePickerField;
