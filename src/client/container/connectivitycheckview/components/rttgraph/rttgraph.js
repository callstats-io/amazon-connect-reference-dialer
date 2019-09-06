import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import lo from 'lodash';

const TOTAL_SEGMENT = 3;
const ONE_MINUTE_IN_MS = 60000;
const ONE_HOUR_IN_MS = 3600000;
const ONE_DAY_IN_MS = 86400000;

const getStepSize = (first = {}, last = {}) => {
  let startTimeInMs = lo.get(first, 'epochTime', 0);
  let endTimeInMs = lo.get(last, 'epochTime', 0);

  let totalDayInMillis = Math.max(Math.abs(startTimeInMs - endTimeInMs), ONE_DAY_IN_MS);
  let stepSizeInMillis = Math.round(totalDayInMillis / TOTAL_SEGMENT);
  // console.warn('->', first, last, totalDayInMillis, stepSizeInMillis);
  return stepSizeInMillis;
};

const getUnit = (first = {}, last = {}) => {
  let startTimeInMs = lo.get(first, 'epochTime', 0);
  let endTimeInMs = lo.get(last, 'epochTime', 0);
  let diffInMs = Math.abs(startTimeInMs - endTimeInMs);
  if (diffInMs < ONE_HOUR_IN_MS) {
    let stepSize = Math.floor(diffInMs / 1000 / 60 / 3);
    return { unit: 'minute', stepSize };
  }
  if (diffInMs < ONE_DAY_IN_MS) {
    let stepSize = Math.floor(diffInMs / 1000 / 60 / 60 / 3);
    return { unit: 'minute', stepSize };
  }
  let stepSize = Math.floor(diffInMs / 1000 / 60 / 60 / 24 / 3);
  return { unit: 'day', stepSize };
};

// will distributed to 50 points
const getChartOptions = (pctResult = [], unit = undefined, stepSize) => {
  // const stepSize = getStepSize(lo.first(pctResult), lo.last(pctResult));
  // console.warn('~getChartOptions', pctResult, stepSize);
  // const {unit, stepSize} = getUnit(lo.first(pctResult), lo.last(pctResult));
  // console.warn('->', 'pctResult', pctResult, unit);
  const chartOptions = {
    scaleShowValues: true,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.yLabel.toFixed(2)} kbps`;
        }
      }
    },
    scales: {
      xAxes: [{
        display: true,
        type: 'time',
        distribution: 'series',
        autoSkip: false,
        beginAtZero: true,
        // stepSize: stepSize,
        // unitStepSize: stepSize,
        // unit: 'hour',
        time: {
          tooltipFormat: 'MMM D, h:mm:ss a',
          // unit: unit,
          // unitStepSize: stepSize,
          // stepSize: stepSize,
          beginAtZero: true,
          autoSkip: false,
          displayFormats: {
            'millisecond': 'HH:mm:ss',
            'second': 'HH:mm:ss',
            'minute': 'HH:mm:ss',
            'hour': 'HH:mm',
            'day': 'DD MMM'
          }
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false
        },
        ticks: {
          callback: function (value) {
            return `${value} kbps`;
            // return Math.round(value);
          },
          // min: 0,
          // max: 3000,
          autoSkip: true
          // stepSize: 150
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

const getThroughput = (pctRecords) => {
  let throughput = pctRecords.map((item) => {
    let throughput = parseFloat(item.throughput || 0);
    return throughput;
  });
    // console.warn('data ',throughput);
  return throughput || [];
};

const getChartData = (pctRecords) => {
  const chartData = {
    labels: getLabels(pctRecords),
    datasets: [{
      label: 'Throughput timeline',
      // backgroundColor: '#6c757d',
      // borderColor: '#6c757d',
      borderWidth: 0,
      pointRadius: 1,
      lineTension: 0,
      // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      // hoverBorderColor: 'rgba(255,99,132,1)',
      data: getThroughput(pctRecords)
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

const RTTGraph = ({ pctResult = {}, lastSCT = {}, unit = undefined, stepSize = 0 }) => (
  <div className={`row mt-${isBad(lastSCT) ? 1 : 3}`}>
    <div className="col-12" style={{ position: 'relative', height: '100px' }}>
      <Line data={getChartData(pctResult)} options={getChartOptions(pctResult, unit, stepSize)}/>
    </div>
  </div>
);

RTTGraph.propTypes = {
  pctResult: PropTypes.array,
  lastSCT: PropTypes.object,
  unit: PropTypes.string,
  stepSize: PropTypes.number
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RTTGraph);
