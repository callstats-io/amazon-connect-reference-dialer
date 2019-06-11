import React from 'react';
import PropTypes from 'prop-types';

import closeBtn from './../../../res/images/fa-close-or-dismiss.svg';
import styles from './confirmreport.css';

const ConfirmReport = ({ requestReportACallIssue, closeReport, skipReport }) => (
  <div className={`col-12`}>
    <div className={`modal fade ${styles.reportBoxMain}`} id="confirmReportIssue" tabIndex={-1} role="dialog"
			 aria-labelledby="confirmReportIssue" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className={`row ${styles.reportBox}`}>
              <div className={`col-12`}>
                <div className="row mt-2">
                  <div className="col-10">
                    <span
                      className={styles.reportText}>Would you like to report a call issue?</span>
                  </div>
                  <div className="col-2 text-right">
                    <img onClick={closeReport} className={`p-0 m-0 ${styles.cursor}`}
											 src={closeBtn}/>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-11">
                    <span className={styles.issueReportText}>We encourage to report if you have a quality issues during the call. </span>
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col-6">
                  </div>
                  <div onClick={skipReport}
										 className={`col-3 text-right ${styles.skip} ${styles.cursor}`}> SKIP
                  </div>
                  <div onClick={requestReportACallIssue}
										 className={`col-3 text-right ${styles.report} ${styles.cursor}`}> Report
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ConfirmReport.propTypes = {
  requestReportACallIssue: PropTypes.func.isRequired,
  closeReport: PropTypes.func.isRequired,
  skipReport: PropTypes.func.isRequired
};
export default ConfirmReport;
