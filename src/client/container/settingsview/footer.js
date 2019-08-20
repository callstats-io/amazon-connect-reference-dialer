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
    divClass: 'col-12 p-0',
    pClass: 'text-right',
    style: { fontSize: '11px', fontStyle: 'italic' }
  }
};

const Footer = ({ requestReportACallIssue, requestConnectivityCheck }) => (
  <div className='card-footer' style={cardFooter}>
    <div className='row'>
      <ReportACall divClass={FooterStyle.reportCall.divClass}
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

      <Language divClass={FooterStyle.language.divClass}
        linkClass={FooterStyle.language.linkClass}
        style={FooterStyle.language.style}
        onClickHandler={() => true} />

      <div class={FooterStyle.version.divClass}>
        <p class={FooterStyle.version.pClass} style={FooterStyle.version.style}>callstats dialer v{window.CS_VERSION}</p>
      </div>
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
