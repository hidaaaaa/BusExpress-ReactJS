import { InputNumber } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

function NumberField({ form, name, label }) {
	return (
		<div className={`inputField `}>
			<div className="inputField__title">{label}</div>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<InputNumber
						size={`large`}
						className="inputField__input"
						ref={ref}
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						style={{ width: '100%' }}
						formatter={(value) => {
							if (value < 0) {
								return -value;
							} else {
								return value;
							}
						}}
						// error={!!hasError}
						// helperText={errors[name]?.message}
					/>
				)}
			/>
		</div>
	);
}

export default NumberField;
