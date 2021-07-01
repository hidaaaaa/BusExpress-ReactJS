import { Col, Row } from 'antd';
import React from 'react';
import './style/footer.scss';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

function Footer(props) {
	return (
		<div className="footer">
			<Row className="footer__list list">
				<Col className="list__item item" xs={12} sm={12} md={12} lg={6}>
					<div className="item__logo">
						<img src={logo} alt="" />
					</div>
				</Col>
				<Col className="list__item" xs={12} sm={12} md={12} lg={6}>
					<div className="item__title">About</div>
					<div className="item__description">
						<Link to="">About Us</Link>
					</div>
					<div className="item__description">
						<Link to="">Blog</Link>
					</div>
					<div className="item__description">
						<Link to="/home">Booking ticket</Link>
					</div>
				</Col>
				<Col className="list__item" xs={12} sm={12} md={12} lg={6}>
					<div className="item__title">Always-on Support</div>
					<div className="item__description">Booking 1800 6936 (07:00-21:00)</div>
					<div className="item__description">Support 028.71.087.088 (07:00-21:00)</div>
					<div className="item__description">86 - 88 Cao Thang, Ward 4, District 3, Ho Chi Minh, Vietnam.</div>
					<div className="item__description">
						Building - 195/10E Dien Bien Phu, Ward 15, Binh Thanh District, Ho Chi Minh, Vietnam.
					</div>
					<div className="item__description">+842871 078 079</div>
					<div className="item__description">+842871 078 079</div>
					<div className="item__description">bus@express.com</div>
				</Col>
				<Col className="list__item" xs={12} sm={12} md={12} lg={6}>
					<div className="item__title">Delivery</div>
					<div className="item__description">
						<Link to="">Booking methods</Link>
					</div>
					<div className="item__description">
						<Link to="">Payment</Link>
					</div>
					<div className="item__description">
						<Link to="">Cash voucher</Link>
					</div>
					<div className="item__description">
						<Link to="">Return</Link>
					</div>
				</Col>
			</Row>

			<div className="footer__copyright">Copyright © 2020 Bus Express. All rights reserved.</div>
		</div>
	);
}

export default Footer;
