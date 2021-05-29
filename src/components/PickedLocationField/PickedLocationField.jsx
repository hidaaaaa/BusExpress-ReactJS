import { Select } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import './styles/styles.scss';

const { Option } = Select;
function PickedLocationField(props) {
	const { form, name, label } = props;

	// const {
	// 	formState: { errors },
	// } = form;

	return (
		<div className="box">
			<div className="box__title">{label}</div>

			<Controller
				onChange={(value) => {
					return value;
				}}
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<Select className="box__select" ref={ref} name={name} value={value} onChange={onChange} onBlur={onBlur}>
						<Option value="TPHCM" className="box__option">
							TPHCM
						</Option>
						<Option value="KienGiang" className="box__option">
							KienGiang
						</Option>
						<Option value="AnGiang" className="box__option">
							AnGiang
						</Option>
						<Option value="TienGiang" className="box__option">
							TienGiang
						</Option>
					</Select>
				)}
			/>
		</div>
	);
}

export default PickedLocationField;
