import React from "react";
import styles from './login.css';

const loginURL = `https://${__connect_url__}/connect/login?landat=%2Fconnect%2Fccp#/`;

const Body = ({}) => (
	<div className={`card-body ${styles.cardBodyMain}`}>
		<div className="row h-100">
			<div className={`col-md-12 text-center my-auto`}>
				<a href={loginURL} target="_blank" className={styles.loginText}>Please login ... </a>
			</div>
		</div>
	</div>
);

Body.propTypes = {};
export default Body;
