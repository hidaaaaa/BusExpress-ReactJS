import { Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

function PasswordField({ form, name, label }) {
	return (
		<div className={`passwordField `}>
			<div className="passwordField__title">{label}</div>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<Input.Password
						size={`large`}
						className="passwordField__select"
						ref={ref}
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						//disabled={location.destination === '' && name === 'DiemDen' && location.origin === ''}
					/>
				)}
			/>
		</div>
	);
}

export default PasswordField;
