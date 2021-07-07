import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import Loading from 'components/Loading/Loading';
import React from 'react';
function LoadingSeat(props) {
	const items = [];

	for (let i = 0; i < 30; i++) {
		items.push(
			<Col key={i} span={8} className="row__item item">
				<CheckableTag className="item__seat disable">
					<FontAwesomeIcon icon={faSpinner} />
				</CheckableTag>
			</Col>
		);
	}

	return (
		<>
			<Row className="seatMap__row row">
				{items}
				<Loading className="loadingScreen" text={'Loading'} />
			</Row>
		</>
	);
}

export default LoadingSeat;
