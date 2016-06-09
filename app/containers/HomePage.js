import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <p>
          Start editing your projects in Disolution
        </p>
        <Link to="/projects">
          <RaisedButton label="Go to Projects" secondary={true} />
        </Link>
      </div>
    );
  }
}
