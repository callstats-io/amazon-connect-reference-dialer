import React from "react";

import Header from './header';
import Body from './body';
import Footer from './footer';

const card = {
	marginRight: '8%',
	boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
	backgroundColor: '#ffffff',
};

const zeroPadding = {
	padding: '0'
};

const StateChangeView = ({}) => (
	<div className={`row h-100 border-right border-top border-bottom`}>
		<div className={`col-md-12`} style={zeroPadding}>
			<div className={`card h-100`} style={card}>
				<Header/>
				<Body/>
				<Footer/>
			</div>
		</div>
	</div>
);

export default StateChangeView;
