import { Select } from 'antd';
import React, { useState } from 'react';
import { formatDate } from '../../../../utils/formatDate';
import './style/style.scss';
const { Option } = Select;
function Infomation({ listTrip = null, onSubmit = null, date = null }) {
	const [time, setTime] = useState('');

	const handleChangeTime = async (value) => {
		if (onSubmit) {
			await onSubmit(value);
		}

		await setTime(value);
	};

	return (
		<div className="information">
			<div className="information__item date">
				<span>{time}</span>

				<span>{date}</span>
			</div>
			<div className="information__item">
				<span>Giờ khởi hành </span>
				<Select style={{ width: 120 }} onChange={handleChangeTime}>
					{listTrip?.map((item, index) => (
						<Option key={index} value={item.GioDi}>
							{item.GioDi}
						</Option>
					))}
				</Select>
			</div>
			<div className="information__item">
				<span>Bến Xe</span>
				<div>
					<span>
						<strong>TPHCM</strong>
					</span>
					<span> &rArr; </span>
					<span>
						<strong>RachGia</strong>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Infomation;
