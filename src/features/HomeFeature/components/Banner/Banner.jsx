import React from 'react';
import { Link } from 'react-router-dom';
import SelectDateForm from '../SelectDateForm/SelectDateForm';
import './styles/banner.scss';
import banner from 'assets/images/toppng.com-bus-png-1718x976.png';

function Banner({ animationBanner, onSubmit = null, loading = true }) {
	const handleSubmit = async (values) => {
		if (onSubmit) {
			await onSubmit(values);
		}
	};

	return (
		<div className="banner" id="booking">
			<div className={`banner__info info ${animationBanner ? 'animation' : ''}`}>
				<div className="info__title">FIND BUS TICKET WITH BUS EXPRESS</div>
				<div className="info__description">
					The online bus booking services of redBus offers a plethora of advantages than it’s offline prehistoric
					booking modes.
				</div>
				<div className="info__btn">
					<Link to="/pricing" className="link-btn">
						See more
					</Link>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<SelectDateForm onSubmit={handleSubmit} loading={loading} />
				</div>
			</div>
			{/* <div className={`banner__img ${animationBanner ? 'animation' : ''}`}>
				<img src={banner} alt="" />
			</div> */}
		</div>
	);
}

export default Banner;
