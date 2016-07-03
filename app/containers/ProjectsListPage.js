import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectsGrid from '../components/projects/list/ProjectsGrid';
import * as ProjectActions from '../actions/projects';

function mapStateToProps(state) {
  const props = {};

  if(state.projects.length) {
    props.projects = state.projects;
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsGrid);
