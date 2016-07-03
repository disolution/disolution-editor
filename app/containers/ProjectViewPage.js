import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectViewer from '../components/ProjectViewer';
import * as ProjectActions from '../actions/projects';
import * as NotificationActions from '../actions/notifications';

function mapStateToProps(state, ownProps) {
  const { projects } = state;
  const project = projects.find(pr => pr.id === ownProps.params.projectId);
  return {
    projects,
    project
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectActions, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewer);
