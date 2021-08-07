import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

function RadioField({ form, name, label, defaultValue = '' }) {
	return (
		<div className={`inputField `}>
			<div className="inputField__title">{label}</div>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<div
						style={{
							backgroundColor: '#ffffff',
							color: 'black',
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'center',
							padding: '0.5rem 1rem',
							borderRadius: '2px',
						}}
					>
						<div className="">Male</div>
						<Switch
							style={{ margin: '0 0.5rem' }}
							size="large"
							checkedChildren={<FontAwesomeIcon icon={faFemale} />}
							unCheckedChildren={<FontAwesomeIcon icon={faMale} />}
							defaultChecked={defaultValue}
							ref={ref}
							name={name}
							checked={value}
							onChange={onChange}
							onBlur={onBlur}
						/>
						<div className="">Female</div>
					</div>
				)}
			/>
		</div>
	);
}

export default RadioField;
