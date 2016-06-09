import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectViewer from '../components/ProjectViewer';
import * as ProjectActions from '../actions/projects';

function mapStateToProps(state, ownProps) {
  const { projects } = state;
  return {
    projects: projects,
    project: projects.find(pr => pr.id === ownProps.params.projectId)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewer);
