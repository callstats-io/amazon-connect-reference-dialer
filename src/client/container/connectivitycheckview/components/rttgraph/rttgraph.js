import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Line} from 'react-chartjs-2';
import lo from 'lodash';

const TOTAL_SEGMENT = 4;
const ONE_MINUTE_IN_MS = 60000;
const ONE_HOUR_IN_MS = 12*3600000;
const ONE_DAY_IN_MS = 86400000;

const getStepSize = (first = {}, last = {}) => {
	let startTimeInMs = (new Date).getTime();
	let endTimeInMs = lo.get(last, 'epochTime', 0);
	let diff = Math.abs(startTimeInMs - endTimeInMs);
	let stepSize = Math.round((diff / TOTAL_SEGMENT) / ONE_DAY_IN_MS);

	return stepSize;
};
// will distributed to 50 points
const getChartOptions = (pctResult = []) => {
	const stepSize = getStepSize(lo.first(pctResult), lo.last(pctResult));
	const chartOptions = {
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				label: function (tooltipItem) {
					return `${tooltipItem.yLabel.toFixed(2)} ms`;
				}
			}
		},
		scales: {
			xAxes: [{
				display: true,
				type: 'time',
				time: {
					tooltipFormat: 'MMM D, h:mm:ss a',
					unit: 'hour',
					stepSize: stepSize,
					displayFormats: {
						'millisecond': 'HH:MM',
						'second': 'HH:MM',
						'minute': 'HH:MM',
						'hour': 'DD MMM',
						'day': 'DD MMM',
					}
				}

			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: false,
				},
				ticks: {
					callback: function (label) {
						return `${label} ms`
					},
				}
			}]
		}
	};

	return chartOptions;
};

const getLabels = (pctRecords) => {
	let labels = pctRecords.map((item) => {
		return item.epochTime;
	});
	// console.warn('->labels', labels);
	return labels || [];
};
const getRTT = (pctRecords) => {
	let rtts = pctRecords.map((item) => {
		let rtt = parseFloat(item.rtt || 0);
		return rtt;
	});
	// console.warn('-> total rtts', rtts.length);
	return rtts || [];
};
const getChartData = (pctRecords) => {
	const chartData = {
		labels: getLabels(pctRecords),
		datasets: [{
			label: 'RTT timeline',
			// backgroundColor: '#ffffff',
			// borderColor: '#ffffff',
			borderWidth: 0,
			pointRadius: 1,
			lineTension: 0,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: getRTT(pctRecords),
		}]
	};
	return chartData;
};

const getLatestResultThroughput = (lastRecord = {}) => {
	return lastRecord.throughput || 0;
};

const isBad = (pctResult) => {
	let latestResult = getLatestResultThroughput(pctResult);
	return latestResult < 20;
};

const RTTGraph = ({pctResult = {}, lastSCT = {}}) => (
	<div className={`row mt-${isBad(lastSCT) ? 1 : 3}`}>
		<div className="col-md-12" style={{position: 'relative', height: '100px'}}>
			<Line data={getChartData(pctResult)} options={getChartOptions(pctResult)}/>
		</div>
	</div>
);

RTTGraph.propTypes = {
	pctResult: PropTypes.array,
	lastSCT: PropTypes.object,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RTTGraph);

