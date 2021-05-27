import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import locationAPI from '../../../../api/locationApi';
import './style/style.scss';
const { Option } = Select;
function Infomation({ listTrip = null }) {
	const [trip, setTrip] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const data = await locationAPI.getAll();
				await setTrip(data);
			} catch (error) {
				console.log('false to fetch  list transfer :', error);
			}
		})();
	}, []);
	console.log(trip);
	const locate = trip?.filter((item) => item.MaTX === listTrip[0].MaTX)[0];

	return (
		<div className="information">
			<div className="information__item">
				<span>Giờ khởi hành </span>
				<Select style={{ width: 120 }}>
					{listTrip?.map((item) => (
						<Option key={item.MaCX} value={item.MaCX}>
							{item.GioDi}
						</Option>
					))}
				</Select>
			</div>
			<div className="information__item">
				<span>Bến Xe</span>
				<span>
					{/* <span>{locate.DiemDi}</span>
					<span>&rArr;</span>
					<span>{locate.DiemDen}</span> */}
				</span>
			</div>
		</div>
	);
}

export default Infomation;
