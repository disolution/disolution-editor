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

const MarkdownList = (onChange, { start, type, tight, nodeKey, children, ...others }) => {
  const ListTag = type === 'Bullet' ? 'ul' : 'ol';
  const TodoItem = ({ done, value }) => (
    <li style={{ marginLeft: -22, listStyle: 'none' }}>
      <label>
        <input
          name="md-todo[]"
          onChange={onChange.bind(this, !done, value)}
          type="checkbox"
          checked={done}
        />
        {value}
      </label>
    </li>
  );

  return (
    <ListTag>
      {React.Children.map(children, item => {
        const value = String(item.props.children);
        const done = /^\[x\]/.test(value);
        const todo = /^\[ \]/.test(value);

        return done || todo ?
          <TodoItem done={done} value={value.slice(3)} />
        : item;
      })}
    </ListTag>
  );
};

export default class ProjectViewer extends React.Component {

  static propTypes = {
    projects: PropTypes.array,
    project: PropTypes.object,
    remove: PropTypes.func,
    save: PropTypes.func
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

  todoCheck = (done, value) => {
    const { props: { project, save } } = this;
    const checkMark = [' ', 'x'];
    const query = `\\[${checkMark[+!done]}\\]\\s+${value.trim()}\\n`;

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
            escapeHtml
            renderers={{
              Image: MarkdownImage.bind(null, project.localPath),
              List: MarkdownList.bind(null, this.todoCheck)
            }}
            source={project.article}
          />
        </Paper>
      </div>
    );
  }
}
