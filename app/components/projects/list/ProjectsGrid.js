import path from 'path';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardMedia, CardTitle } from 'material-ui';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import styles from './ProjectsGrid.css';
import ProjectActions from '../view/ProjectActions';

export const ProjectCard = ({ project, remove }) => {
  const imagePath = project.localPath && project.coverImage ?
    encodeURI(`${path.join(project.localPath, project.coverImage)}?${new Date().getTime()}`)
  : '';

  return (
    <Link to={{ pathname: `/projects/${project.id}`, state: { transition: 'slideLeft' } }}>
      <Card className={styles.card} zDepth={1}>
        <CardMedia
          className={styles.coverImage}
          style={{ backgroundImage: `url(${imagePath})` }}
          overlay={
            <CardTitle title={project.title} />
          }
        />
        <ProjectActions {...{ project, remove }} />
      </Card>
    </Link>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object,
  remove: PropTypes.func
};

export default class ProjectsGrid extends Component {

  static propTypes = {
    projects: PropTypes.array,
    remove: PropTypes.func
  };

  static defaultProps = {
    projects: []
  };

  render() {
    const { props: { projects, remove } } = this;
    const viewHeight = { height: 'calc(100vh - 64px)' };
    const colSize = projects.length > 1 ? 6 : 9;

    const projectItems = projects.map((project, i) => (
      <Col key={i} xs={colSize} sm={colSize} md={colSize - 2} style={{ padding: '.5rem' }}>
        <ProjectCard {...{ project, remove }} />
      </Col>)
    );

    let messageCol = '';
    if(!projects.length) {
      messageCol = (
        <div>
          <ArrowIcon style={{ float: 'right', width: 30, height: 30 }} />
          <h3>{"Seems pretty empty. Start a new project"}</h3>
        </div>
      );
    } else if(projects.length === 1) {
      messageCol = (
        <div>
          <h3>{"Here's your first git project. Make it awesome."}</h3>
        </div>
      );
    }
    return (
      <Grid fluid style={viewHeight}>
        <Row center="xs" middle="xs" style={viewHeight}>
          <Col key="message" xs={12}>
            {messageCol}
          </Col>
          {projectItems}
        </Row>
      </Grid>
    );
  }
}
