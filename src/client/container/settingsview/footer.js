import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  onRequestConnectivityCheck,
  onRequestReportCallIssue
} from '../../reducers/acReducer';

import ReportACall from '../footer/components/reportcall';
import DownloadLogs from '../footer/components/downloadlogs';
import ConnectivityCheck from '../footer/components/connectivitycheck';
import Language from '../footer/components/language';
import Version from '../footer/components/version';

import acManager from '../../api/acManager';

const cardFooter = {
  borderTop: '0',
  backgroundColor: '#ffffff'
};

const FooterStyle = {
  reportCall: {
    divClass: 'col-6 p-0',
    linkClass: 'btn align-self-left text-left',
    style: { cursor: 'pointer', color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px' }
  },
  downloadLogs: {
    divClass: 'col-6 p-0',
    linkClass: 'btn text-left',
    style: { cursor: 'pointer', color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px' }
  },
  connectivityCheck: {
    divClass: 'col-6 p-0',
    linkClass: 'btn text-left',
    style: { cursor: 'pointer', color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px' }
  },
  language: {
    divClass: 'col-6 p-0',
    linkClass: 'btn text-left disabled',
    style: { cursor: 'pointer', color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px' }
  },
  version: {
    divClass: 'col-6 p-0',
    linkClass: 'btn text-left disabled',
    style: { cursor: 'pointer', color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px' }
  }
};

const Footer = ({ requestReportACallIssue, requestConnectivityCheck }) => (
  <div className='card-footer' style={cardFooter}>
    <div className='row'>
      <ReportACall id='dialer_settings_report_issue'
        divClass={FooterStyle.reportCall.divClass}
        linkClass={FooterStyle.reportCall.linkClass}
        style={FooterStyle.reportCall.style}
        onClickHandler={requestReportACallIssue} />

      <DownloadLogs divClass={FooterStyle.downloadLogs.divClass}
        linkClass={FooterStyle.downloadLogs.linkClass}
        style={FooterStyle.downloadLogs.style}
        onClickHandler={acManager.downloadACLog} />

      <ConnectivityCheck divClass={FooterStyle.connectivityCheck.divClass}
        linkClass={FooterStyle.connectivityCheck.linkClass}
        style={FooterStyle.connectivityCheck.style}
        onClickHandler={requestConnectivityCheck} />

      <Version divClass={FooterStyle.version.divClass}
        linkClass={FooterStyle.version.linkClass}
        style={FooterStyle.version.style}
        onClickHandler={() => true} />

    </div>
  </div>
);

Footer.propTypes = {
  requestReportACallIssue: PropTypes.func.isRequired,
  requestConnectivityCheck: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  requestReportACallIssue: () => {
    dispatch(onRequestReportCallIssue('pending'));
  },
  requestConnectivityCheck: () => {
    dispatch(onRequestConnectivityCheck('pending'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
