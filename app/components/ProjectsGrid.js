import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardMedia, CardTitle, CardActions, IconButton } from 'material-ui';
import { blueA400 } from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import RemoveIcon from 'material-ui/svg-icons/action/delete';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-upward';

import styles from './ProjectsGrid.css';
import { Link, hashHistory } from 'react-router';

export default class ProjectsGrid extends React.Component {

  static propTypes = {
    projects: PropTypes.array,
    remove: PropTypes.func
  };

  static defaultProps = {
    projects: []
  };

  editProject(projectId) {
    return e => {
      e.preventDefault();
      hashHistory.push('/project-editor/'+projectId);
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

  render () {
    const { props: { projects, remove } } = this;
    const viewHeight = { height: 'calc(100vh - 64px)' };
    const colSize = projects.length > 1 ? 6 : 9;

    const projectItems = projects.map((project, i) => (
      <Col key={i} xs={colSize} sm={colSize} md={colSize-2} style={{padding: '.5rem'}}>
        <Link to={`/projects/${project.id}`}>
          <Card className={styles.card}>
            <CardMedia className={styles.coverImage} style={{ backgroundImage: 'url('+ project.coverImage +')'}}
              overlay={
                <CardTitle title={project.title} />
              } />
            <CardActions>
              <IconButton onClick={this.editProject(project.id)} tooltip="Edit project">
                <EditIcon color={blueA400}/>
              </IconButton>
              <IconButton onClick={this.removeProject(project)} tooltip="Remove project">
                <RemoveIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Link>
      </Col>
    ));

    return (
      <Grid fluid={true} style={viewHeight}>
        <Row center="xs" middle="xs" style={viewHeight}>
          { !projects.length ?
            <Col key="new_project" xs>
              <p>
                <ArrowIcon style={{float:'right', width: 30, height: 30}} />
                {"Seems pretty empty. Start a new project"}
              </p>
            </Col>
          : ( projects.length === 1 ?
            <Col key="make_awesome" xs={12}>
              <p>
                {"Here's your first git project. Make it awesome."}
              </p>
            </Col>
          : '' )}

          { projectItems }
        </Row>
      </Grid>
    );
  }
}
