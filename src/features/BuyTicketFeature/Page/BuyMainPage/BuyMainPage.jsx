import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from 'antd/lib/layout/layout';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import TableTicket from './Components/TableTicket/TableTicket';

function BuyMainPage(props) {
	const [loading, setLoading] = useState(true);
	const [listBuses, setListBuses] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const rs = await busApi.getAll();
				const rs2 = await busApi.getAllBuses();
				const temp = [];
				const currentDate = new Date();
				await currentDate.setHours(0, 0, 0, 0);
				await rs.map((item) => {
					rs2.findIndex((item2) => {
						const hoursT = parseInt(item2.GioDi.split(':')[0]);
						console.log(new Date(item2.NgayDi), currentDate);
						if (new Date(item2.NgayDi).toString() > currentDate.toString()) {
							if (item2.MaTX >= item.MaTX) {
								const location = (
									<>
										{item.DiemDi} <FontAwesomeIcon icon={faArrowCircleRight} /> {item.DiemDen}
									</>
								);
								temp.push({ ...item, ...item2, location });
							}
						}

						if (new Date(item2.NgayDi).toString() === currentDate.toString() && new Date().getHours() < hoursT) {
							console.log(new Date().getHours(), hoursT);
							if (item2.MaTX >= item.MaTX) {
								const location = (
									<>
										{item.DiemDi} <FontAwesomeIcon icon={faArrowCircleRight} /> {item.DiemDen}
									</>
								);
								temp.push({ ...item, ...item2, location });
							}
						}
					});
				});

				await setListBuses(temp);

				await setLoading(false);
			} catch (error) {}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<Layout className="home" style={{ backgroundAttachment: 'unset', minHeight: '100vh' }}>
			<TableTicket listBuses={listBuses} />
		</Layout>
	);
}

export default BuyMainPage;
