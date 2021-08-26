import { notification } from 'antd';
import Layout from 'antd/lib/layout/layout';
import Aos from 'aos';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';
import SliderCustom from 'components/Slider/Slider';
import data from 'Data/grid-breaker.json';
import Banner from 'features/HomeFeature/components/Banner/Banner';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import GridBreaker from './Component/GridBreaker/GridBreaker';
import './style/mainPage.scss';

function MainPage(props) {
	const [animationBanner, setAnimationBanner] = useState(false);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [buses, setBuses] = useState([]);
	const [dataS, setDataS] = useState([]);

	const getOffset = () => {
		if (window.pageYOffset < 100) {
			setAnimationBanner(true);
		} else {
			setAnimationBanner(false);
		}
	};
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const data = await busApi.getAll();
				setBuses(data);

				fetch('https://60bf294c320dac0017be490f.mockapi.io/Thumbnail')
					.then((respone) => {
						if (respone.ok) {
							return respone.json();
						}
						throw respone;
					})
					.then((data) => {
						setDataS(data);
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {
						setLoading(false);
					});
			} catch (error) {
				console.log('false to fetch  list transfer :', error);
			}
		})();
	}, []);

	useEffect(() => {
		document.addEventListener('scroll', getOffset);
		return () => {
			document.removeEventListener('scroll', getOffset);
		};
	}, []);

	const handleSubmit = async ({ DiemDi, DiemDen, departureDate }) => {
		const index = buses.findIndex((e) => e.DiemDi === DiemDi && e.DiemDen === DiemDen);
		if (index < 0) {
			return notification.error({
				message: 'Error',
				description: 'Cant find the trp',
			});
		}
		let tripid = buses[buses.findIndex((e) => e.DiemDi === DiemDi && e.DiemDen === DiemDen)].MaTX;
		const date = formatDate(departureDate._d);
		const queryParams = {
			tripid: tripid,
			date: date,
		};

		const listTrip = await busApi.getPostsOfTripByDate(queryParams);

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		//console.log(listTrip);// const hoursT = parseInt(index.GioDi.split(':')[0]);

		if (listTrip.length < 1) {
			return notification.error({
				message: 'Error',
				description: 'Cant find the trip',
			});
		} else {
			if (new Date(listTrip[0].NgayDi).toString() === currentDate.toString()) {
				const hoursT = parseInt(listTrip[0].GioDi.split(':')[0]);

				if (new Date().getHours() < hoursT) {
					history.push(`/home/buy?tripid=${tripid}&date=${date}&step=1`);
				} else {
					return notification.error({
						message: 'Error',
						description: 'Cant find the trip',
					});
				}
			} else {
				history.push(`/home/buy?tripid=${tripid}&date=${date}&step=1`);
			}
		}
	};

	if (loading) {
		return <Loading text="loading..." />;
	}

	return (
		<Layout className="home">
			<SliderCustom data={dataS} />

			<Banner animationBanner={animationBanner} onSubmit={handleSubmit} loading={loading} />

			<GridBreaker data={data} loading={loading} />
		</Layout>
	);
}

export default MainPage;
