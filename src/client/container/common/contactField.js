import React from 'react';
import PropTypes from 'prop-types';

import EachContact from '../common/each.contact';

const ContactField = ({ contactList = [], dialContact, onHover, styles }) => (
  <div className={`row ml-0 mr-0 mt-2 ${styles.contactListBox}`} onMouseOver={() => onHover(true)} onMouseOut={() => onHover(false)} >
    <div className={`col-12`}>
      { contactList.map((currentContact, index) => (
        <EachContact
          key={`contact-list-${index}`}
          currentContact={currentContact}
          dialContact={dialContact}
          styles={styles}
        />
      ))
      }
    </div>
  </div>
);

ContactField.propTypes = {
  contactList: PropTypes.array,
  dialContact: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};
ContactField.defaultProps = {
  onHover: () => {}
}
export default ContactField;
