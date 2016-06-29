import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { MarkdownPreview } from 'react-marked-markdown';
import { ProjectActions } from './ProjectsGrid';
import path from 'path';

import {
  RaisedButton as Button,
  FlatButton,
  Paper,
  FontIcon,
  FloatingActionButton
} from 'material-ui';

export default class ProjectViewer extends React.Component {
  state = {
  };

  static propTypes = {
    projects: PropTypes.array,
    project: PropTypes.object,
    remove: PropTypes.func
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

  render() {
    const { props: { project, remove } } = this;
    if(!project.id) {
      return (<p>No project found</p>);
    }
    return (
      <div>
        { project.coverImage ?
          <div style={{backgroundImage: 'url('+(project.localPath && project.coverImage ?
            encodeURI(path.join(project.localPath, project.coverImage) + '?' + new Date().getTime())
          : '')+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: 200}} />
        : '' }
        <Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
          <ProjectActions project={project} remove={remove} />
          <h1>{project.title}</h1>
          <MarkdownPreview value={project.article}/>
        </Paper>
      </div>
    );
  }
}
