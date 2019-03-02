import React, {Component} from "react";
import {connect} from "react-redux";
import MetricsGraphics from 'react-metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';

class RTTGraph extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const chartOptions = {};
		return (
			<MetricsGraphics
				data={[{'date': new Date('2014-11-01'), 'value': 12}, {'date': new Date('2014-11-02'), 'value': 18}]}
				area ={false}
				linked={true}
				full_width={true}
				height={70}
				bottom={0}
				left={0}
				right={0}
				xax_count={2}
			/>
		)
	}
}

RTTGraph.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RTTGraph);
