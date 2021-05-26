import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import headerConst from '../../constants/headerConst';

console.log(headerConst);

function HeaderAppBar(props) {
	return (
		<Layout className="header">
			<Menu mode="horizontal" defaultSelectedKeys={['1']} className="header__menu">
				{headerConst.map((headerItem, key) => (
					<Menu.Item key={key} className="header__item">
						<Link to={headerItem.URL} className="header__link">
							{headerItem.NAME}
						</Link>
					</Menu.Item>
				))}
			</Menu>
		</Layout>
	);
}

export default HeaderAppBar;
