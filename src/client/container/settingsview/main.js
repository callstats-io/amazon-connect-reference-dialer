import React from "react";
import Header from './../header/index';
import Body from './body';
import Footer from './footer';

import styles from './settings.css';

const SettingPageView = ({}) => (
	<div className={`row h-100`}>
		<div className={`col-md-12 ${styles.zeroPadding}`}>
			<div className={`card h-100 ${styles.cardBodyMain}`}>
				<Header/>
				{/*<Body/>*/}
				<Footer/>
			</div>
		</div>
	</div>
);

export default SettingPageView;
