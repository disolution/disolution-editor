import { shell } from 'electron';
import path from 'path';

import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Card, CardMedia, CardTitle, CardActions, IconButton } from 'material-ui';
import { blueA400 } from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import RemoveIcon from 'material-ui/svg-icons/action/delete';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

import styles from './ProjectsGrid.css';
import { Link, hashHistory } from 'react-router';

export class ProjectActions extends React.Component {
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
        { project.localPath ?
          <IconButton onClick={this.openFolder(project.localPath)} tooltip="Open folder">
            <FolderIcon />
          </IconButton>
        : ''}
        <IconButton onClick={this.editProject(project.id)} tooltip="Edit project">
          <EditIcon color={blueA400}/>
        </IconButton>
        <IconButton onClick={this.removeProject(project)} tooltip="Remove project">
          <RemoveIcon />
        </IconButton>
      </CardActions>
    );
  }

}

export default class ProjectsGrid extends React.Component {

  static propTypes = {
    projects: PropTypes.array,
    remove: PropTypes.func
  };

  static defaultProps = {
    projects: []
  };



  render () {
    const { props: { projects, remove } } = this;
    const viewHeight = { height: 'calc(100vh - 64px)' };
    const colSize = projects.length > 1 ? 6 : 9;

    const projectItems = projects.map((project, i) => (
      <Col key={i} xs={colSize} sm={colSize} md={colSize-2} style={{padding: '.5rem'}}>
        <Link to={`/projects/${project.id}`}>
          <Card className={styles.card} zDepth={1}>
            <CardMedia className={styles.coverImage} style={{ backgroundImage: 'url('+ project.coverImage +')'}}
              overlay={
                <CardTitle title={project.title} />
              } />
            <ProjectActions project={project} remove={remove}/>
          </Card>
        </Link>
      </Col>
    ));

    return (
      <Grid fluid={true} style={viewHeight}>
        <Row center="xs" middle="xs" style={viewHeight}>
          { !projects.length ?
            <Col key="new_project" xs>
              <div>
                <ArrowIcon style={{float:'right', width: 30, height: 30}} />
                <h3>{"Seems pretty empty. Start a new project"}</h3>
              </div>
            </Col>
          : ( projects.length === 1 ?
            <Col key="make_awesome" xs={12}>
              <div>
                <h3>{"Here's your first git project. Make it awesome."}</h3>
              </div>
            </Col>
          : '' )}

          { projectItems }
        </Row>
      </Grid>
    );
  }
}
