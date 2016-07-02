import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

import * as folders from '../utils/folders';
import moment from 'moment';

export default class ProjectHistory extends React.Component {

  static propTypes = {
    project: PropTypes.object
  };

  static defaultProps = {
    project: {}
  };

  state = {
    commits: []
  }

  componentDidMount() {
    this.getCommits();
  }

  getCommits = () => {
    const { props: { project: { localPath } } } = this;
    folders.listenCommits(localPath, (commit) => {
      this.setState({
        commits: [...this.state.commits, commit]
      });
    });
  }

  render() {
    const { props: { project: { localPath } }, state: { commits } } = this;

    return (
      <div>
        {commits.map((commit, i) => (
          <p key={i}>{String(commit.sha().slice(0, 7))} - {String(commit.summary())} {moment(commit.date()).fromNow()} {String(commit.author().name())}</p>
        ))}
      </div>
    );
  }
}
