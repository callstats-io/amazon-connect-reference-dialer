import React from 'react';
import PropTypes from 'prop-types';

import styles from './quickconnects.css';

import {
  truncate
} from '../../utils/acutils';

class EachContact extends React.Component {
  constructor (props) {
    super(props);
    this.tooltipRef = React.createRef();
  }
  componentDidMount () {
    $(this.tooltipRef.current).tooltip();
  }
  render () {
    return (
      <div className={`row ${styles.contactItem}`}>
        <div className={`col-8 pl-1 pr-0 ml-0 mr-0`}>
          <a className={`btn pl-0 ml-0 pr-0 mr-0 ${styles.contactName}`}
            ref={this.tooltipRef}
            title={this.props.currentContact.name}
            data-placement="top">
            { truncate(`${this.props.currentContact.name}`, 22) }
          </a>
        </div>
        <div className={`col-4 text-right pr-0`}>
          <a className={`btn ${styles.dialButton}`} onClick={() => this.props.dialContact(this.props.currentContact)}>
            Dial
          </a>
        </div>
      </div>
    );
  }
}

EachContact.propTypes = {
  currentContact: PropTypes.object.isRequired,
  dialContact: PropTypes.func.isRequired
};

const ContactField = ({ contactList = [], dialContact }) => (
  <div className={`row ml-0 mr-0 mt-2 ${styles.contactListBox}`}>
    <div className={`col-12`}>
      { contactList.map((currentContact, index) => (
        <EachContact
          key={`contact-list-${index}`}
          currentContact={currentContact}
          dialContact={dialContact}/>
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
