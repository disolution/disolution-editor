import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import { hashHistory } from 'react-router';
import ProjectActions from './ProjectActions';
import path from 'path';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Sticky from 'react-stickynode';

import {
  Paper, List, ListItem, Subheader
} from 'material-ui';

import CloudIcon from 'material-ui/svg-icons/file/cloud';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import GithubIcon from './icons/github';

import * as renderers from './markdown/Renderers';

function getDomain(str) {
  const matches = str.match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches && matches[1] ? matches[1] : false;
}

export default class ProjectViewer extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    projects: PropTypes.array,
    project: PropTypes.object,
    getRemotes: PropTypes.func,
    remove: PropTypes.func,
    save: PropTypes.func
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

  componentDidMount() {
    const { props: { project: { id, localPath }, getRemotes } } = this;

    if(localPath) {
      getRemotes({ id, localPath });
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
                <h1 style={{ cursor: 'pointer' }} onClick={() => hashHistory.push(`/projects/${project.id}`)}>
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
              {project.remotes && project.remotes.length ? (
                <List>
                  <Subheader>Published at</Subheader>
                  {project.remotes.map((remote, i) =>
                    <ListItem
                      style={{ fontSize: '.8em' }}
                      key={i}
                      leftIcon={(
                        getDomain(remote.url) === 'github.com' ?
                          <GithubIcon />
                        : <CloudIcon />
                      )}
                      primaryText={getDomain(remote.url) === 'github.com' ? 'Github.com' : `${remote.name}`}
                      href={remote.url}
                      tooltip={remote.url}
                    />
                  )}
                </List>
              )
              : ''}
            </Sticky>
          </Col>
        </Row>
      </Grid>
    );
  }
}
