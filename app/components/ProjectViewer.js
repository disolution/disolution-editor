import React, { Component } from 'react';
import { Link } from 'react-router';
import { MarkdownPreview } from 'react-marked-markdown';

import {
  RaisedButton as Button,
  FlatButton,
  Paper,
  FontIcon,
  FloatingActionButton
} from 'material-ui';

export default class ProjectViewer extends Component {
  state = {
  };

  static propTypes = {
    projects: React.PropTypes.array,
    project: React.PropTypes.object
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

  render() {
    const { props: { project } } = this;
    if(!project.id) {
      return (<p>No project found</p>);
    }
    return (
      <div>
        { project.coverImage.length ?
          <div style={{backgroundImage: 'url('+project.coverImage+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: 200}} />
        : '' }
        <Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
          <h1>{project.title}</h1>
          <MarkdownPreview value={project.article}/>
        </Paper>
      </div>
    );
  }
}
