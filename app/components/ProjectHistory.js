import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

import * as folders from '../utils/folders';
import moment from 'moment';
import { Avatar, List, ListItem } from 'material-ui';
import gravatar from 'gravatar';

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
    const { props: { project }, state: { commits } } = this;

    return (
      <List>
        {commits.map((commit, i) => (
          <ListItem
            key={i}
            innerDivStyle={{ padding: '10px 5px 10px 50px' }}
            leftAvatar={
              <Avatar style={{ top: 10, left: 10 }} size={30} src={gravatar.url(commit.author().email(), { protocol: 'https', s: 30 })} />
            }
            primaryText={String(commit.summary())}
            secondaryText={`${String(commit.sha().slice(0, 7))} - ${moment(commit.date()).fromNow()} by ${String(commit.author().name())}`}
          />
        ))}
      </List>
    );
  }
}
