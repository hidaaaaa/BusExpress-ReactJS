import { Select } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const { Option } = Select;

function ComboBoxField({ form, name, label, defaultValue = '', data = [] }) {
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
							{data.map((item, index) => (
								<Option key={index} value={item.value}>
									{item.name}
								</Option>
							))}
						</Select>
					</>
				)}
			/>
		</div>
	);
}

export default ComboBoxField;
