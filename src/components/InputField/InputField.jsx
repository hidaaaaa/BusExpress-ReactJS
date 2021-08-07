import { Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputField({ form, name, label, defaultValue = '' }) {
	//console.log(errors);
	return (
		<div className={`inputField `}>
			<div className="inputField__title">{label}</div>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<Input
						defaultValue={defaultValue}
						size={`large`}
						className="inputField__input"
						ref={ref}
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						// error={!!hasError}
						// helperText={errors[name]?.message}
					/>
				)}
			/>
		</div>
	);
}

export default InputField;
