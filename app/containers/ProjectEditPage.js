import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectEditor from '../components/ProjectEditor';
import * as ProjectActions from '../actions/projects';
import * as NotificationActions from '../actions/notifications';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps;
  const { projects, settings } = state;
  const newProps = {
    settings,
    projects
  };
  if(params.projectId) {
    newProps.project = projects.find(pr => pr.id === params.projectId);
  }
  return newProps;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectActions, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditor);
