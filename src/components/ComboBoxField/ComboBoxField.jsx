import { Select } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const { Option } = Select;

function ComboBoxField({ form, name, label, defaultValue = '' }) {
	return (
		<div className={`inputField `}>
			<div className="inputField__title">{label}</div>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<>
						<Select
							defaultValue={defaultValue}
							style={{ width: '100%' }}
							onChange={onChange}
							ref={ref}
							name={name}
							value={value}
							onBlur={onBlur}
							size={`large`}
							className="inputField__input"
						>
							<Option value="BUS">BUS</Option>
							<Option value="Xe Du Lịch">Xe du lịch</Option>
						</Select>
					</>
				)}
			/>
		</div>
	);
}

export default ComboBoxField;
