import React from 'react';
import PropTypes from 'prop-types';
import EachContact from '../common/each.contact';

import styles from './transfercall.css';
const ContactField = ({ contactList = [], dialContact }) => (
  <div className={`row ml-0 mr-0 mt-2 ${styles.contactListBox}`}>
    <div className={`col-12`}>
      {
        contactList.map((currentContact, index) => (
          <EachContact
            key={`contact-list-${index}`}
            currentContact={currentContact}
            dialContact={dialContact}
            styles={styles}/>
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
