import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './style/profile.scss';

function Profile() {
	const user = useSelector((state) => state.auth.current.rs);

	return (
		<div className="profile">
			<div className="profile__title">Profile</div>
			<Row className="profile__list list">
				{Object.keys(user).map((key, index) => (
					<>
						<Col xs={7} sm={7} md={4} lg={4} xl={4} className="list__item">
							{key}
						</Col>
						<Col span={1} className="list__item">
							:
						</Col>
						<Col xs={16} sm={16} md={7} lg={7} xl={7} className="list__item">
							{user[key]}
						</Col>
					</>
				))}
			</Row>
		</div>
	);
}

export default Profile;
