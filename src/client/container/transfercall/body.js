import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './transfercall.css';

import sessionManager from './../../api/sessionManager';

import {
  onRequestShowTransferCall
} from '../../reducers/acReducer';

import CloseQuickConnect from './close';
import FindContact from './findcontact';
import ContactField from '../common/contactField';

const THROTTLE_TIMEOUT = 100;

class Body extends Component {
  constructor (props) {
    super(props);
    this.defaultContactList = [];
    this.state = {
      contactList: [...this.defaultContactList],
      contactValue: '',
      lastUpdate: Date.now()
    };
    this.updateContactList = this.updateContactList.bind(this);
    this.contactChange = this.contactChange.bind(this);
    this.dialContact = this.dialContact.bind(this);
    this.dialNumber = this.dialNumber.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount () {
    sessionManager.getTransferConnList().then(quickContacts => {
      this.defaultContactList = quickContacts;
      this.setState({
        contactList: [...this.defaultContactList]
      });
    }).catch(err => {
      console.error('->', err);
    });
  }

  updateContactList (token) {
    const { lastUpdate } = this.state;
    const curTime = Date.now();
    if (curTime - lastUpdate < THROTTLE_TIMEOUT) {
      return;
    }

    let currentContactList = this.defaultContactList.filter((currentContact) => {
      return (currentContact.name || '').includes(token);
    });
    this.setState({
      contactList: currentContactList,
      lastUpdate: curTime
    });
  }

  contactChange (event) {
    let { value } = event.target;
    this.setState({
      contactValue: value
    });
    this.updateContactList(value);
  }

  dialContact (selectedContact = undefined) {
    sessionManager.dialContact(selectedContact).then(success => {
      this.close();
    }, err => {
      console.error(err);
    });
    this.setState({
      contactList: [...this.defaultContactList],
      contactValue: ''
    });
  }
  dialNumber () {
    const { contactValue } = this.state;
    sessionManager.dialNumber(contactValue).then(success => {
      this.close();
    }, err => {
      console.error(err);
    });
    this.setState({
      contactList: [...this.defaultContactList],
      contactValue: ''
    });
  }

  close () {
    this.props.close();
  }

  render () {
    return (
      <div className={`card-body ${styles.cardBody}`}>
        <CloseQuickConnect close={this.close} />
        <FindContact contactChange={this.contactChange}
          dialNumber={this.dialNumber}
          contactValue={this.state.contactValue}
        />
        <ContactField contactList={this.state.contactList}
          dialContact={this.dialContact}
          styles={styles}
        />
      </div>
    );
  }
}

Body.propTypes = {
  close: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  close: () => {
    dispatch(onRequestShowTransferCall('close'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
