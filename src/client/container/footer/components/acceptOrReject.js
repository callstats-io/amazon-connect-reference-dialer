import React from "react";
import PropTypes from "prop-types";

import dialButton from './../../../res/images/fa-dial-button.svg';

const AcceptOrReject = ({divClass = '', linkClass = '', style = {}, onClickHandler, text = "", isReject = false}) => (
	<div className={divClass}>
		<a className={linkClass}
		   style={style}
		   onClick={onClickHandler}>
			{isReject && <img src={dialButton}/>}
			{text}
		</a>
	</div>
);

AcceptOrReject.propTypes = {
	divClass: PropTypes.string,
	linkClass: PropTypes.string,
	style: PropTypes.object,
	text: PropTypes.string.isRequired,
	isReject: PropTypes.bool,
	onClickHandler: PropTypes.func.isRequired,
};

export default AcceptOrReject;
