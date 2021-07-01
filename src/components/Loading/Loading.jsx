import React from 'react';
import './style/loading.scss';

function Loading(props) {
	return (
		<div className="loading">
			<h1 className="jt --debug">
				<span className="jt__row">
					<span className="row__text">Loading...</span>
				</span>
				<span className="jt__row row" aria-hidden="true">
					<span className="row__text">Loading...</span>
				</span>
				<span className="jt__row row" aria-hidden="true">
					<span className="row__text">Loading...</span>
				</span>
				<span className="jt__row row" aria-hidden="true">
					<span className="row__text">Loading...</span>
				</span>
			</h1>
		</div>
	);
}

export default Loading;
