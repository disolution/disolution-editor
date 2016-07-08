import React, { PropTypes } from 'react';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import ReactMarkdown from 'react-markdown';
import { IndexLink, hashHistory } from 'react-router';
import ProjectActions from './ProjectActions';
import ProjectRemotes from './ProjectRemotes';
import ProjectStatus from './ProjectStatus';
import path from 'path';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Sticky from 'react-stickynode';

import {
  Paper, Menu, MenuItem
} from 'material-ui';

import { grey300 } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

import HistoryIcon from 'material-ui/svg-icons/action/history';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ProjectIcon from 'material-ui/svg-icons/action/toc';

import * as renderers from '../../markdown/Renderers';

export default class ProjectViewer extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    projects: PropTypes.array,
    project: PropTypes.object,
    saveProjectFromPath: PropTypes.func,
    remove: PropTypes.func,
    save: PropTypes.func
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

  componentDidMount() {
    const { props: { project: { localPath }, saveProjectFromPath } } = this;

    if(localPath) {
      this.setTimeout(() => {
        saveProjectFromPath({ localPath });
      }, 600);
    }
  }

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
    const { props: { children, project, remove } } = this;

    if(!project.id) {
      return (<p>No project found</p>);
    }
    const imagePath = project.localPath && project.coverImage ?
      encodeURI(`${path.join(project.localPath, project.coverImage)}?${new Date().getTime()}`)
    : '';

    return (
      <Grid fluid>
        <Row>
          <Col xs={9}>
            {children ?
              (<Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
                <h1
                  style={{ cursor: 'pointer' }}
                  onClick={() => hashHistory.push(`/projects/${project.id}`)}
                >
                  <BackIcon /> {project.title}
                </h1>
                {React.cloneElement(children, { project })}
              </Paper>)
            : (
              <Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
                <h1>{project.title}</h1>
                {project.coverImage ?
                  <img role="presentation" src={imagePath} />
                : ''}
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
              </Paper>
            )}
          </Col>
          <Col xs={3}>
            <Sticky top={64}>
              <ProjectActions {...{ project, remove }} />
              <Paper style={{ display: 'inline-block' }}>
                <Menu>
                  <IndexLink
                    to={`/projects/${project.id}`}
                    activeStyle={{ display: 'block', backgroundColor: fade(grey300, 0.5) }}
                  >
                    <MenuItem leftIcon={<ProjectIcon />} primaryText="Description" />
                  </IndexLink>
                  <IndexLink
                    to={`/projects/${project.id}/history`}
                    activeStyle={{ display: 'block', backgroundColor: fade(grey300, 0.5) }}
                  >
                    <MenuItem leftIcon={<HistoryIcon />} primaryText="History" />
                  </IndexLink>
                </Menu>
              </Paper>
              {project.files && project.files.length ?
                <ProjectStatus files={project.files} />
              : ''}
              {project.remotes && project.remotes.length ?
                <ProjectRemotes remotes={project.remotes} />
              : ''}
            </Sticky>
          </Col>
        </Row>
      </Grid>
    );
  }
}

reactMixin(ProjectViewer.prototype, TimerMixin);
