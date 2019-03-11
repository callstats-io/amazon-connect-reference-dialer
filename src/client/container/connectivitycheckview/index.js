import React from "react";
import Header from '../header/index';
import Body from './body';
import Footer from './footer';

const ConnectivityCheckView = ({}) => (
	<div className={`row h-100`}>
		<div className={`col-md-12`} style={{padding: '0'}}>
			<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
				<Header/>
				<Body/>
				<Footer/>
			</div>
		</div>
	</div>
);
export default ConnectivityCheckView;
