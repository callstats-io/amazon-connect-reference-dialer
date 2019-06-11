import React from 'react';
import PropTypes from 'prop-types';

import styles from './quickconnects.css';

const ContactField = ({ contactList = [], dialContact }) => (
  <div className={`row ml-0 mr-0 mt-2 ${styles.contactListBox}`}>
    <div className={`col-12`}>
      {
        contactList.map((currentContact, index) => (
          <div className={`row ${styles.contactItem}`} key={`contact-list-${index}`}>
            <div className={`col-8`}>
              <a className={`btn pl-0 ml-0 ${styles.contactName}`}>
                {currentContact.name}
              </a>
            </div>
            <div className={`col-4 text-right pr-0`}>
              <a className={`btn ${styles.dialButton}`} onClick={() => dialContact(currentContact)}>
								Dial
              </a>
            </div>
          </div>
        ))
      }

    </div>
  </div>
);

ContactField.propTypes = {
  contactList: PropTypes.array,
  dialContact: PropTypes.func.isRequired
};
export default ContactField;
