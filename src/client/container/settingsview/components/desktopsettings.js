import React from "react";
import PropTypes from "prop-types";

const DeskPhoneSettings = ({enabled, handleInputChange, changeToDeskphone, dialableCountries = [], phoneNumber = ''}) => (
	<div className={"row"}>
		<div className={"col-md-9"}>
			<ReactPhoneInput inputStyle={{minWidth: '15.5em', maxWidth: '15.5em'}}
							 onlyCountries={dialableCountries}
							 defaultCountry={'fi'}
							 enableSearchField={true}
							 value={phoneNumber}
							 inputExtraProps={{
								 name: 'phone',
								 required: true,
								 autoFocus: true
							 }}
							 onChange={handleInputChange}/>
		</div>
		<div className="col-md-3 p-0 m-0">
			<a className="btn" style={{
				backgroundColor: '#a3acb6',
				fontFamily: 'AmazonEmber',
				color: '#ffffff',
				height: '35px',
				lineHeight: '1.3em',
				cursor: 'pointer',
			}} onClick={changeToDeskphone}>
				Save
			</a>
		</div>
	</div>
);

DeskPhoneSettings.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	changeToDeskphone: PropTypes.func.isRequired,
	dialableCountries: PropTypes.array.isRequired,
	phoneNumber: PropTypes.string.isRequired,
};

export default DeskPhoneSettings;
