import React from "react";
import PropTypes from "prop-types";

import languageIcon from '../../../res/images/fa-language.svg';

const Language = ({divClass = '', linkClass = '', style = {}, onClickHandler}) => (
	<div className={divClass}>
		<a className={linkClass}
		   style={style}
		   onClick={onClickHandler}
		   href="#"> <img src={languageIcon}/> English </a>
	</div>
);

Language.propTypes = {
	divClass: PropTypes.string,
	linkClass: PropTypes.string,
	style: PropTypes.object,
	onClickHandler: PropTypes.func.isRequired,
};

export default Language;
