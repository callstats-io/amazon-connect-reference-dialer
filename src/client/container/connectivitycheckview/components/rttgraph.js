import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Line} from 'react-chartjs-2';
import lo from "lodash";

/*
# todo
segmented the timeline series point
manually fill the gaps between two irregular intervals
 */

const chartOptions = {
	legend: {
		display: false
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem) {
				return tooltipItem.yLabel;
			}
		}
	},
	scales: {
		xAxes: [{
			type: 'time',
			time: {
				displayFormats: {
					'millisecond': 'MMM DD',
					'second': 'MMM DD',
					'minute': 'MMM DD',
					'hour': 'MMM DD',
					'day': 'MMM DD',
					'week': 'MMM DD',
					'month': 'MMM DD',
					'quarter': 'MMM DD',
					'year': 'MMM DD',
				}
			}
		}],
	},
};

const getLabels = (pctRecords) => {
	let labels = pctRecords.map((item) => {
		return item.isoTime;
	});
	// console.warn('->labels', labels);
	return labels || [];
};
const getRTT = (pctRecords) => {
	let rtts = pctRecords.map((item) => {
		let rtt = parseFloat(item.rtt);
		return rtt || 0;
	});
	// console.warn('->rtts', rtts);
	return rtts || [];
};
const getChartData = (pctRecords) => {
	const chartData = {
		labels: getLabels(pctRecords),
		datasets: [{
			label: 'RTT timeline',
			backgroundColor: '#ccc',
			borderColor: '#ccc',
			borderWidth: 3,
			pointRadius: 0,
			lineTension: 0,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: getRTT(pctRecords),
		}]
	};
	return chartData;
};

const getLatestResultThroughput = (pctResult) => {
	let lastRecord = lo.last(pctResult) || {};
	return lastRecord.throughput || 0;
};

const isBad = (pctResult) => {
	let latestResult = getLatestResultThroughput(pctResult);
	return latestResult < 20;
};

const RTTGraph = ({pctResult = {}}) => (
	<div className={`row mt-${isBad(pctResult) ? 1 : 3}`}>
		<div className="col-md-12" style={{height: '90px'}}>
			<Line data={getChartData(pctResult)} options={chartOptions}/>
		</div>
	</div>
);

RTTGraph.propTypes = {
	pctResult: PropTypes.array,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RTTGraph);

