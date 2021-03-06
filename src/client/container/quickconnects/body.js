import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './quickconnects.css';

import sessionManager from './../../api/sessionManager';

import {
  onRequestShowQuickConnects
} from '../../reducers/acReducer';

import CloseQuickConnect from './close';
import FindContact from '../common/findContact';
import ContactField from '../common/contactField';

const THROTTLE_TIMEOUT = 100;

class Body extends Component {
  constructor (props) {
    super(props);
    this.defaultContactList = [];
    this.state = {
      contactList: [...this.defaultContactList],
      contactValue: '',
      lastUpdate: Date.now(),
      isContactListHover: false
    };
    this.updateContactList = this.updateContactList.bind(this);
    this.contactChange = this.contactChange.bind(this);
    this.dialContact = this.dialContact.bind(this);
    this.dialNumber = this.dialNumber.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount () {
    sessionManager.getQuickConnectionList().then(quickContacts => {
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
    const { phoneNumber } = selectedContact;
    sessionManager.dialNumber(phoneNumber).then(success => {
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
  
  hoverHandler = (newVal) => {
    this.setState({
      isContactListHover: newVal
    })
  }

  render () {
    const {contactValue, isContactListHover, contactList} = this.state
    return (
      <div className={`card-body ${styles.cardBody}`}>
        <CloseQuickConnect close={this.close}/>
        <FindContact contactChange={this.contactChange}
          dialNumber={this.dialNumber}
          contactValue={contactValue}
          isContactListHover={isContactListHover}
          styles={styles}
        />
        <ContactField contactList={contactList}
          dialContact={this.dialContact}
          onHover={this.hoverHandler}
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
    dispatch(onRequestShowQuickConnects('close'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
