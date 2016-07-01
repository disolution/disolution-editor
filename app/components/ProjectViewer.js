import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import ProjectActions from './ProjectActions';
import path from 'path';

import {
  Paper
} from 'material-ui';

import * as renderers from './markdown/Renderers';
import * as folders from '../utils/folders.js';

export default class ProjectViewer extends React.Component {

  static propTypes = {
    projects: PropTypes.array,
    project: PropTypes.object,
    remotes: PropTypes.array,
    remove: PropTypes.func,
    save: PropTypes.func
  };

  static defaultProps = {
    projects: [],
    project: {},
    remotes: []
  };

  todoCheck = (done, value) => {
    const { props: { project, save } } = this;
    const checkMark = [' ', 'x'];
    const query = `\\[${checkMark[+!done]}\\]\\s+${value.trim()}(?:$|\\n)`;

    const newArticle = project.article.replace(
      new RegExp(query, 'g'),
      `[${checkMark[+done]}] ${value.trim()}\n`
    );
    save({
      id: project.id,
      article: newArticle
    });
  }

  render() {
    const { props: { project, remove, remotes } } = this;
    if(!project.id) {
      return (<p>No project found</p>);
    }
    const imagePath = project.localPath && project.coverImage ?
      encodeURI(`${path.join(project.localPath, project.coverImage)}?${new Date().getTime()}`)
    : '';
    const coverStyle = {
      backgroundImage: `url(${imagePath})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: 200
    };

    return (
      <div>
        {project.coverImage ?
          <div style={coverStyle} />
        : ''}
        <Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
          <ProjectActions project={project} remove={remove} />
          <h1>{project.title}</h1>
          <ReactMarkdown
            escapeHtml
            renderers={{
              ...renderers,
              Image: renderers.Image.bind(null, project.localPath),
              List: renderers.List.bind(null, this.todoCheck),
              CodeBlock: renderers.CodeBlock
            }}
            source={project.article}
          />
          {remotes.map(r => <p>{r}</p>)}
        </Paper>
      </div>
    );
  }
}
