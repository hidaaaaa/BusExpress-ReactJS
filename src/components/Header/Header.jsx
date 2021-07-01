import { faAlignJustify, faChevronLeft, faGlobe, faTimes, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'assets/images/logo.png';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/header.scss';

function Header(props) {
	const [toggleMobile, setToggleMobile] = useState(false);
	const [toggleMenu, setToggleMenu] = useState('');
	const location = useLocation();

	const handleShowNavbar = () => {
		setToggleMobile(!toggleMobile);
	};

	const handleShowMenuUser = () => {
		setToggleMenu('user');
	};

	const handleShowMenuLang = () => {
		setToggleMenu('lang');
	};

	const handleCloseMenu = () => {
		setToggleMenu('');
	};

	return (
		<nav className="header">
			<div className="header__logo">
				<img src={logo} alt="" />
			</div>

			<div className={`header__menu ${toggleMobile ? 'show-menu' : ''}`}>
				<ul className="top">
					<li className={location.pathname.search('/home') > -1 ? 'active' : ''}>
						<Link to="/home" className="header__link">
							Home
						</Link>
					</li>
					<li className={location.pathname.search('/buy') > -1 ? 'active' : ''}>
						<Link to="/buy" className="header__link ">
							buy ticket
						</Link>
						<div className="choosen"></div>
					</li>
					<li className={location.pathname.search('/pricing') > -1 ? 'active' : ''}>
						<Link to="/pricing" className="header__link ">
							Pricing
						</Link>
						<div className="choosen"></div>
					</li>
					<li className={location.pathname.search('/faq') > -1 ? 'active' : ''}>
						<Link to="/faq" className="header__link">
							FAQ
						</Link>
					</li>
					<li className={location.pathname.search('/help') > -1 ? 'active' : ''}>
						<Link to="/help" className="header__link">
							Help
						</Link>
					</li>
				</ul>
				<ul className="bottom">
					<li className="header__globe">
						<div className="globe" onClick={toggleMenu === 'lang' ? handleCloseMenu : handleShowMenuLang}>
							<FontAwesomeIcon icon={faGlobe} />
						</div>

						<div className={`header__menu ${toggleMenu === 'lang' ? 'show-menu' : ''}`}>
							<ul className="top">
								<li className="title">
									<div onClick={handleCloseMenu}>
										<FontAwesomeIcon icon={faChevronLeft} />
									</div>
									<span>Lang</span>
									<div></div>
								</li>
								<li>
									<Link to="/account/me" className="header__link">
										English
									</Link>
								</li>
								<li>
									<Link to="/acc" className="header__link">
										Vietnamese
									</Link>
								</li>
							</ul>
						</div>
					</li>

					<li className="header__user">
						<div className="user" onClick={toggleMenu === 'user' ? handleCloseMenu : handleShowMenuUser}>
							<div>
								<FontAwesomeIcon icon={faUserAlt} />
							</div>
							<span>MINUSKING</span>
						</div>
						<div className={`header__menu ${toggleMenu === 'user' ? 'show-menu' : ''}`}>
							<ul className="top">
								<li className="title">
									<div onClick={handleCloseMenu}>
										<FontAwesomeIcon icon={faChevronLeft} />
									</div>
									<span>MINUSKING</span>
									<div></div>
								</li>
								<li>
									<Link to="/account/me" className="header__link">
										ACCOUNT
									</Link>
								</li>
								<li>
									<Link to="/acc" className="header__link">
										SIGN OUT
									</Link>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>

			<div className="header__toggle" onClick={handleShowNavbar}>
				<div>{toggleMobile ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faAlignJustify} />}</div>
			</div>
		</nav>
	);
}

export default Header;
