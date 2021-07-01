import Layout from 'antd/lib/layout/layout';
import Banner from 'features/HomeFeature/components/Banner/Banner';
import React, { useEffect, useState } from 'react';
import GridBreaker from './Component/GridBreaker/GridBreaker';
import './style/mainPage.scss';
import Aos from 'aos';
import { useHistory } from 'react-router-dom';
import busApi from 'api/busApi';
import { formatDate } from 'utils/formatDate';
import Loading from 'components/Loading/Loading';

function MainPage(props) {
	const [animationBanner, setAnimationBanner] = useState(false);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [listTrip, setListTrip] = useState([]);
	const [data, setData] = useState([]);
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const data = await busApi.getAll();
				setListTrip(data);
				setLoading(false);
			} catch (error) {
				console.log('false to fetch  list transfer :', error);
			}

			fetch('https://60bf294c320dac0017be490f.mockapi.io/grid-breaker')
				.then((respone) => {
					if (respone.ok) {
						return respone.json();
					}
					throw respone;
				})
				.then((data) => {
					setData(data);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		})();
	}, []);

	const getOffset = () => {
		if (window.pageYOffset < 100) {
			setAnimationBanner(true);
		} else {
			setAnimationBanner(false);
		}
	};

	useEffect(() => {
		document.addEventListener('scroll', getOffset);
		return () => {
			document.removeEventListener('scroll', getOffset);
		};
	}, []);

	const handleSubmit = ({ DiemDi, DiemDen, departureDate }) => {
		console.log(DiemDen);
		let tripid = listTrip[listTrip.findIndex((e) => e.DiemDi === DiemDi && e.DiemDen === DiemDen)].MaTX;
		const date = formatDate(departureDate._d);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<Layout className="home">
			<Banner animationBanner={animationBanner} onSubmit={handleSubmit} loading={loading} />

			<GridBreaker data={data} loading={loading} />
		</Layout>
	);
}

export default MainPage;
