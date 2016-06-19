import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Paper } from 'material-ui';

import * as folders from '../utils/folders';

export default class ProjectHistory extends React.Component {

  static propTypes = {
    projects: PropTypes.array,
    projectPath: PropTypes.string.isRequired
  };

  static defaultProps = {
    projects: []
  };

  render() {
    const { props: { projectPath } } = this;

    return (
      <div>
        <Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
          <h1>{projectPath}</h1>
        </Paper>
      </div>
    );
  }
}
