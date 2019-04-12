import React from "react";
import PropTypes from "prop-types";

import closeOrDismissIcon from './../../res/images/fa-close-or-dismiss.svg';
import styles from './transfercall.css';

const CloseQuickConnect = ({close}) => (
	<div className="row ">
		<div className="col-md-10">
			<span className={styles.quickConnectText}>Transfer call</span>
		</div>
		<div className="col-md-2"
			 onClick={close}>
			<img src={closeOrDismissIcon} className={styles.cursor}/>
		</div>
	</div>
);

CloseQuickConnect.propTypes = {
	close: PropTypes.func.isRequired,
};

export default CloseQuickConnect;
