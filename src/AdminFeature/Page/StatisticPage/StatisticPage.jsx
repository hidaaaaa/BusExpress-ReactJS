import { Column } from '@ant-design/charts';
import StatisticDate from 'AdminFeature/Components/StatisticDate/StatisticDate';
import { DatePicker } from 'antd';
import busApi from 'api/busApi';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { formatDate } from 'utils/formatDate';
import { formatPrice } from 'utils/formatMoney';
import './StatisticPage.scss';

const { RangePicker } = DatePicker;

function StatisticPage(props) {
	const [totalRevenue, setTotalRevenue] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [totalMoney, setTotalMoney] = useState(0);
	const [totalTicket, settotalTicket] = useState(0);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				const result = await busApi.getTotalRevenue();

				let total = 0;

				await result.map((item) => (total = total + item.DonGia));

				const temp = [];
				result.map((item) => {
					const index = temp.findIndex((tempValue) => formatDate(new Date(item.NgayDi)) === tempValue.date);

					if (index > -1) {
						temp[index] = {
							...temp[index],
							totalPrice: temp[index].totalPrice + item.DonGia,
							tickets: temp[index].tickets + 1,
						};
					} else {
						temp.push({ date: formatDate(new Date(item.NgayDi)), totalPrice: item.DonGia, tickets: 1 });
					}
				});

				console.log(temp);

				await settotalTicket(result.length);
				await setTotalMoney(total);
				await setTotalRevenue(temp);
				await setDataSource(temp);
				setLoading(false);
			} catch (error) {}
		})();
	}, [loading]);

	const onChangeDate = (values) => {
		if (!!values) {
			const temp = totalRevenue.filter((item) => {
				console.log(values[1]._d);
				return (
					new Date(item.date).getTime() >= new Date(values[0]._d.setHours(0, 0, 0, 0)).getTime() &&
					new Date(item.date).getTime() <= new Date(values[1]._d.setHours(23, 59, 59)).getTime()
				);
			});

			setDataSource(temp);
		} else {
			setDataSource(totalRevenue);
		}
	};

	if (loading) {
		return <Loading />;
	}

	const config = {
		data: dataSource,
		height: 400,
		xField: 'date',
		yField: 'totalPrice',
		point: {
			size: 5,
			shape: 'diamond',
		},
		label: {
			style: {
				fill: '#333',
			},
		},
		onReady: (plot) => {
			plot.on('plot:click', (evt) => {
				const { x, y } = evt;
				// const { xField } = plot.options;
				const tooltipData = plot.chart.getTooltipItems({ x, y });
				history.push(`/admin/statistic/${tooltipData[0]?.title}`);
			});
		},
		tooltip: {
			customContent: (title, items) => {
				return (
					<>
						<h5 style={{ marginTop: 16 }}>Date: {title}</h5>
						<ul style={{ paddingLeft: 0 }}>
							{items?.map((item, index) => {
								const { data } = item;
								return (
									<li
										key={item.year}
										className="g2-tooltip-list-item"
										data-index={index}
										style={{ marginBottom: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
									>
										<span
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												width: '100%',
												marginBottom: '5px',
											}}
										>
											<span style={{ margiRight: 16 }}>Total : </span>
											<span className="g2-tooltip-list-item-value">{formatPrice(data.totalPrice)}</span>
										</span>
										<span
											style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
										>
											<span style={{ margiRight: 16 }}>Tickets : </span>
											<span className="g2-tooltip-list-item-value">{data.tickets}</span>
										</span>
									</li>
								);
							})}
						</ul>
					</>
				);
			},
		},
	};

	return (
		<div style={{ backgroundColor: '#0f0f0f', padding: '2rem', borderRadius: '20px', marginTop: '2rem' }}>
			<Switch>
				<Route path="/admin/statistic" exact>
					<div className="total">
						<div className="total__revenue">revenue: {formatPrice(totalMoney)} </div>
						<div className="total__ticket">{totalTicket} tickets</div>
					</div>
					<RangePicker onChange={onChangeDate} />
					<Column {...config} />
				</Route>

				<Route path="/admin/statistic/:date">
					<StatisticDate />
				</Route>
			</Switch>
		</div>
	);
}

export default StatisticPage;
