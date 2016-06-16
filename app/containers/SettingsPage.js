import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsForm from '../components/SettingsForm';
import * as SettingsActions from '../actions/settings';

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
