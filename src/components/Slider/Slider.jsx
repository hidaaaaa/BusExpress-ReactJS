import { Carousel } from 'antd';
import Loading from 'components/Loading/Loading';
import useWindowSize from 'CoustomHook/useWindowsSize';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { formatPrice } from 'utils/formatMoney';
import './style/Slider.scss';

function SliderCustom({ data }) {
	const [width] = useWindowSize();
	const match = useRouteMatch();
	const [loading, setLoading] = useState(true);
	const [position, setPositon] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			let pos = position;
			if (position < 5 && width >= 768) {
				setPositon(pos + 1);
			} else {
				setPositon(0);
			}
		}, 6100);
		return () => clearInterval(interval);
	}, [position, width]);

	return (
		<div className="sliderContainer">
			<div className="slider">
				<ul className={`slider__container list${data.length}`}>
					{data?.map((item, index) => (
						<li key={index} className={`aspectRatioContainer ${index === position ? 'active' : ''}`}>
							<div className="aspectRatioContainer__content">
								<div className="carouselContent">
									<div className="carouselContent__picture">
										<img src={item.mainImage} alt="" />
									</div>
									<div className="carouselContent__skrin" />
									<div className="carouselContent__content">
										<div className="carouselContent__picture">
											<img src={item.nameImage} alt="" />
										</div>
										<div className="carouselContent__info">
											<span>{item.title}</span>
											<div className="discription">{item.discription}</div>
										</div>
										<div className="carouselContent__buyContainer">
											<span>
												{item.price.type === 'none' ? (
													'Free'
												) : (
													<>
														Starting at <del>{item.price.oldPrice !== '' ? formatPrice(item.price.oldPrice) : ''}</del>{' '}
														{formatPrice(item.price.salePrice)}
													</>
												)}
											</span>
											<div className="buyBtn">
												<Link to={`${match.path}/mega-sale`}>Learn More</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="slider__carouselControl">
					<ul className="listContainer">
						{data?.map((item, index) => (
							<li key={index}>
								<div
									onClick={() => setPositon(index)}
									className={`listContainer__item ${index === position ? 'active' : ''}`}
								>
									<div className="listContainer__img">
										<img src={item.thumbImage} alt="" />
									</div>
									<div className="listContainer__title">{item.name}</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* mobile slider */}

			<div className="sliderMobile">
				<div className="sliderMobile__track">
					<Carousel autoplay>
						{data?.map((item, index) => (
							<div key={index} className="sliderMobile__item">
								<Link to="" className="item__link">
									<div className="image">
										<img src={item.mainImage} alt="" />
									</div>
								</Link>
								<div className="item__content">
									<div className="info">
										<span className="info__name">{item.name}</span>
										<div className="info__description">{item.discription}</div>
									</div>
									<div className="buyContainer">
										<span>
											{item.price.type === 'none' ? (
												'Free'
											) : (
												<>
													Starting at
													<br />
													<del>{item.price.oldPrice !== '' ? formatPrice(item.price.oldPrice) : ''}</del>{' '}
													{formatPrice(item.price.salePrice)}
												</>
											)}
										</span>
										<div className="buyBtn">
											<Link to={`${match.path}/mega-sale`}>Learn More</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</Carousel>
				</div>
			</div>
		</div>
	);
}

export default SliderCustom;
