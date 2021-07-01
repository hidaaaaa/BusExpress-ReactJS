import { Select } from 'antd';
import data from 'Data/location.json';
import React from 'react';
import { Controller } from 'react-hook-form';
import './styles/locationPickerField.scss';

const { Option } = Select;
function LocationPickerField(props) {
	const { form, name, label, handle, location } = props;

	return (
		<div
			className={`box ${location.destination === '' && name === 'DiemDen' && location.origin === '' ? 'disable' : ''}`}
		>
			<div className="box__title">{label}</div>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<Select
						bordered={false}
						size={`large`}
						className="box__select"
						ref={ref}
						name={name}
						value={name === 'DiemDi' ? location.origin : location.destination}
						onChange={async (value) => {
							onChange(value);
							if (handle) {
								await handle(value);
							}
						}}
						onBlur={onBlur}
						disabled={location.destination === '' && name === 'DiemDen' && location.origin === ''}
					>
						{data.map((item, index) => (
							<Option
								key={index}
								value={item.value}
								className="box__option"
								disabled={
									(item.value === location.origin && name === 'DiemDen') ||
									(item.value === location.destination && name === 'DiemDi')
								}
							>
								{item.name}
							</Option>
						))}
					</Select>
				)}
			/>
		</div>
	);
}

export default LocationPickerField;
