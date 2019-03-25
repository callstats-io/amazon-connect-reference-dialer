import React from "react";
import styles from './loading.css';

const Loading = ({}) => (
	<span className={`${styles["lds-ellipsis"]} w-100`}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</span>
);

export default Loading;
