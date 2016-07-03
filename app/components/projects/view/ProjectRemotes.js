import React, { PropTypes } from 'react';
import { Subheader, List, ListItem } from 'material-ui';
import GithubIcon from '../../icons/github';
import CloudIcon from 'material-ui/svg-icons/file/cloud';

function getDomain(str) {
  const matches = str.match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches && matches[1] ? matches[1] : false;
}

const ProjectRemotes = ({ remotes }) => (
  <List>
    <Subheader>Published at</Subheader>
    {remotes.map((remote, i) =>
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
);

ProjectRemotes.propTypes = {
  remotes: PropTypes.array
};

export default ProjectRemotes;
