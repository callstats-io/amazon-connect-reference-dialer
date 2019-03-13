import React from "react";
import PropTypes from "prop-types";

const DropDownOptions = ({toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioDevice}) => (

	<div className="col-md-10 pr-0 mr-0">
		<div className="btn-group" style={{maxWidth: '220px'}}>
			<button className="btn" type="button" style={{
				border: 'solid 1px #cfcfcf',
				fontFamily: 'AmazonEmber',
				fontSize: '13px',
				maxHeight: '45px',
				minWidth: '200px',
			}} onClick={toggleMenuItem}> {audioDevice}
			</button>
			<button onClick={toggleMenuItem} type="button"
					className="btn dropdown-toggle dropdown-toggle-split"
					aria-haspopup="true" aria-expanded="false"
					style={{border: 'solid 1px #cfcfcf'}}>
				<span className="sr-only">Toggle Dropdown</span>
			</button>
			<div className={`dropdown-menu ${showMenuItem && 'show'}`}
				 xPlacement="bottom-start" style={{
				position: 'absolute',
				willChange: 'transform',
				top: '0px',
				left: '0px',
				transform: 'translate3d(0px, 38px, 0px)',
				border: 'solid 1px #cfcfcf'
			}}>
				{
					inputDeviceList.map((item, indx) => (
						<a key={`${item.deviceId}-${indx}`} className="dropdown-item"
						   onClick={changeAudioInputDevice(item)}
						   href="#" style={{
							fontFamily: 'AmazonEmber',
							fontSize: '13px',
						}}>{item.label}</a>
					))
				}
			</div>

		</div>
	</div>
);

DropDownOptions.propTypes = {
	toggleMenuItem: PropTypes.func.isRequired,
	changeAudioInputDevice: PropTypes.func.isRequired,
	showMenuItem: PropTypes.func.isRequired,
	inputDeviceList: PropTypes.array.isRequired,
	audioDevice: PropTypes.string.isRequired,
};

export default DropDownOptions;
