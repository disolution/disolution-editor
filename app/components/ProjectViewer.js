import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { ProjectActions } from './ProjectsGrid';
import path from 'path';

import {
  RaisedButton as Button,
  FlatButton,
  Paper,
  FontIcon,
  FloatingActionButton
} from 'material-ui';

const MarkdownImage = (projectPath, { src, title, alt, nodeKey, ...others }) => {
  const newSrc = ! /^https?:\/\/.+$/.test(src) ? path.join(projectPath, src) : src;
  return (
    <img key={nodeKey} src={newSrc} title={title} alt={alt} {...others} />
  );
};

export default class ProjectViewer extends React.Component {

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
          <ReactMarkdown
            renderers={{
              Image: MarkdownImage.bind(null, project.localPath)
            }}
            source={project.article}
          />
        </Paper>
      </div>
    );
  }
}
