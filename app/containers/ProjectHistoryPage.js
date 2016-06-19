import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectHistory from '../components/ProjectHistory';

function mapStateToProps(state, ownProps) {
  const { projects } = state;
  return {
    projects,
    projectPath: ownProps.params.gitPath
  };
}

export default connect(mapStateToProps)(ProjectHistory);
