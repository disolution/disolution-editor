import React, { PropTypes } from 'react';
import { Subheader, List, ListItem } from 'material-ui';

const ProjectStatus = ({ files }) => (
  <List>
    <Subheader>Uncommitted changes</Subheader>
    <ListItem
      primaryText={`${files.length} files`}
      tooltip={files.map(file => file.path).join('\n')}
    />
  </List>
);

// {files.map((file, i) =>
//   <ListItem
//     style={{ fontSize: '.8em' }}
//     key={i}
//     primaryText={file.path}
//     tooltip={file.statuses.join(' ')}
//   />
// )}

ProjectStatus.propTypes = {
  files: PropTypes.array
};

export default ProjectStatus;
