import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardMedia, CardTitle, CardActions, IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-upward';

import styles from './ProjectsGrid.css';
import { Link, hashHistory } from 'react-router';

export default class ProjectsGrid extends React.Component {

  static propTypes = {
    projects: React.PropTypes.array
  };

  static defaultProps = {
    projects: []
  };

  render () {
    const { props: { projects } } = this;
    const viewHeight = { height: 'calc(100vh - 64px)' };
    const colSize = projects.length > 1 ? 6 : 9;
    return (
      <Grid fluid={true} style={viewHeight}>
        <Row center="xs" middle="xs" style={viewHeight}>
          { !projects.length ?
            <Col xs>
              <p>
                <ArrowIcon style={{float:'right', width: 30, height: 30}} />
                {"Seems pretty empty. Start a new project"}
              </p>
            </Col>
          : ( projects.length === 1 ?
            <Col xs={12}>
              <p>
                {"Here's your first git project. Make it awesome."}
              </p>
            </Col>
          : '' )}
          { projects.map((project, i) => (
            <Col key={i} xs={colSize} sm={colSize} md={colSize-2} style={{padding: '.5rem'}}>
              <Link to={`/projects/${project.id}`}>
                <Card>
                  <CardMedia className={styles.coverImage} style={{ backgroundImage: 'url('+ project.coverImage +')'}}
                    overlay={
                      <IconButton onClick={e => { e.preventDefault(); hashHistory.push('/project-editor/'+project.id); }} tooltip="Edit project">
                        <EditIcon color="white"/>
                      </IconButton>
                    } />
                  <CardTitle title={project.title} />
                </Card>
              </Link>
            </Col>
          )) }
        </Row>
      </Grid>
    );
  }
}
