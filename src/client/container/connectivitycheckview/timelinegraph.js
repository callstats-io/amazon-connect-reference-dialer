import React, {Component} from "react";
import {connect} from "react-redux";

const LineChart = require("react-chartjs").Line;
function rand(min, max, num) {
	var rtn = [];
	while (rtn.length < num) {
		rtn.push((Math.random() * (max - min)) + min);
	}
	return rtn;
}


class TimelineGraph extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const chartData = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "My First dataset",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: rand(32, 100, 7)
				},
				{
					label: "My Second dataset",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: rand(32, 100, 7)
				}
			]
		};
		const chartOptions = {};
		return (
			<LineChart data={chartData} options={chartOptions}/>
		)

	}
}

TimelineGraph.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimelineGraph);
