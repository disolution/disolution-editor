import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectViewer from '../components/projects/view/ProjectViewer';
import * as ProjectActions from '../actions/projects';

function mapStateToProps(state, ownProps) {
  const { projects } = state;
  const project = projects.find(pr => pr.id === ownProps.params.projectId);
  return {
    projects,
    project
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewer);
