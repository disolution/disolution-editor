import { shell } from 'electron';

import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';
import HistoryIcon from 'material-ui/svg-icons/action/history';
import { blueA400 } from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import RemoveIcon from 'material-ui/svg-icons/action/delete';

import { CardActions, IconButton } from 'material-ui';

export default class ProjectActions extends Component {
  static propTypes = {
    project: PropTypes.object,
    remove: PropTypes.func
  };

  editProject(projectId) {
    return e => {
      e.preventDefault();
      hashHistory.push('/project-editor/'+projectId);
    };
  }

  commitHistory(pPath) {
    return e => {
      e.preventDefault();
      hashHistory.push('/history/'+encodeURIComponent(pPath));
    };
  }

  openFolder(pPath) {
    return e => {
      e.preventDefault();
      shell.showItemInFolder(path.join(pPath, '/'));
    };
  }

  removeProject = (project) => {
    const { props: { remove } } = this;
    return e => {
      e.preventDefault();
      const ask = window.confirm('Are you sure you want to remove this project from the grid?');
      if(ask) {
        remove(project);
      }
    };
  }

  render() {
    const { props: { project } } = this;
    return (
      <CardActions>
        {project.localPath ?
          <IconButton onClick={this.openFolder(project.localPath)} tooltip="Open folder">
            <FolderIcon />
          </IconButton>
        : ''}
        {project.localPath ?
          <IconButton onClick={this.commitHistory(project.localPath)} tooltip="Version history">
            <HistoryIcon />
          </IconButton>
        : ''}
        <IconButton onClick={this.editProject(project.id)} tooltip="Edit project">
          <EditIcon color={blueA400} />
        </IconButton>
        <IconButton onClick={this.removeProject(project)} tooltip="Remove project">
          <RemoveIcon />
        </IconButton>
      </CardActions>
    );
  }

}
