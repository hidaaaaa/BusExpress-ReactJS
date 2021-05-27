import Layout from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import locationAPI from '../../../../api/locationApi';
import cover_image from '../../../../assets/images/cover_image.png';
import ChooseTicketForm from '../../components/ChooseTicketForm/ChooseTicketForm';
import { formatDate } from '../../../../utils/formatDate';
import { useDispatch } from 'react-redux';
import { pushListTransfer } from '../../../BuyTicketFeature/TransferSlice';
function MainPage(props) {
	const history = useHistory();
	const [listTrip, setListTrip] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const data = await locationAPI.getAll();
				setListTrip(data);
			} catch (error) {
				console.log('false to fetch  list transfer :', error);
			}
		})();
	}, []);

	const handleChooseTicketFormSubmit = async ({ DiemDi, DiemDen, departureDate, returnDate }) => {
		let tripid = listTrip[listTrip.findIndex((e) => e.DiemDi === DiemDi && e.DiemDen === DiemDen)].MaTX;
		const date = formatDate(departureDate);

		history.push(`/mua-ve?tripid=${tripid}&date=${date}&step=2`);
	};

	return (
		<Layout className="home">
			<div className="home__coverImage">
				<img src={cover_image} alt="" />
			</div>
			<ChooseTicketForm onSubmit={handleChooseTicketFormSubmit} />
		</Layout>
	);
}

export default MainPage;
