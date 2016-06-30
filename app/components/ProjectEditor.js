import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import FormsyMarkdown from './FormsyMarkdown';
import FormsyInlineText from './FormsyInlineText';
import { Form } from 'formsy-react';
import ImageIcon from 'material-ui/svg-icons/image/add-a-photo';
import styles from './ProjectEditorStyles';
import * as folders from '../utils/folders';
import uuid from 'node-uuid';
import path from 'path';

import {
  RaisedButton as Button,
  FlatButton,
  Paper,
  Dialog
} from 'material-ui';

export const ProjectOpenDialog = ({ onSuccess }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onClick={() => onSuccess(false)}
    />
  ];

  return (
    <Dialog
      modal
      title="Select a folder for the project"
      actions={actions}
      open
    >
      <p>It's recommended to create an empty folder for a new project.</p>
      <Button
        label="Select folder"
        secondary
        onClick={() => onSuccess(folders.askFolderPath())}
      />
      <p>You can also import an existing project in DOCN format.</p>
    </Dialog>
  );
};

ProjectOpenDialog.propTypes = {
  onSuccess: PropTypes.func
};

export default class ProjectEditor extends React.Component {

  static propTypes = {
    project: PropTypes.object,
    projects: PropTypes.array,
    settings: PropTypes.object,
    add: PropTypes.func,
    save: PropTypes.func
  }

  static defaultProps = {
    project: {},
    projects: [],
    settings: {}
  }

  state = {
    canSubmit: false,
    project: this.props.project,
    newRepo: true,
    showFolderDialog: !this.props.project.localPath
  }

  componentWillReceiveProps(nextProps) {
    const { project } = nextProps;
    this.form.reset();
    this.setState({ project, showFolderDialog: !project.localPath });
  }

  setValidState(isValid = false) {
    const { state: { canSubmit } } = this;
    if(canSubmit !== isValid) {
      this.setState({ canSubmit: isValid });
    }
  }

  setLocalPath = (localPath) => {
    const { props: { projects, add }, state: { project } } = this;
    console.log("setLocalPath", localPath);

    if(localPath) {
      folders.findProjectInPath(localPath).then(scannedProject => {
        if(scannedProject) {
          if(projects.findIndex(p => p.id === scannedProject.id) == -1) {
            add({ ...scannedProject, localPath });
          } else {
            window.alert('This project has already been added');
          }
          hashHistory.push(`/`);
        }
        this.setState({
          showFolderDialog: false,
          newRepo: !scannedProject,
          project: {
            ...project,
            localPath
          }
        });
      });
    } else {
      hashHistory.push('/');
    }
  }

  setImage = (e) => {
    const { files } = e.target;

    if(files && files.length) {
      const { props: { save }, state: { project } } = this;
      const coverImage = files[0].path;
      const projectObj = { coverImage };
      const imgPath = folders.coverPath(project.localPath, projectObj);
      const relativePath = folders.coverPath('', projectObj);

      this.setState({
        project: {
          ...project,
          coverImage
        }
      });
      folders.writeCover(coverImage, imgPath).then(() => {
        if(project.id) {
          save({
            id: project.id,
            coverImage: relativePath
          });
        }
      });
    }
  }

  submit(data) {
    const { title, article } = data;
    const {
      props: { add, save, settings: { gitAuthor, gitEmail } },
      state: { newRepo, project }
    } = this;

    const projectObj = {
      id: project.id || uuid.v1(),
      title,
      article
    };
    if(project.coverImage) {
      projectObj.coverImage = project.coverImage;
    }
    const addOrSave = project.id ? save : add;
    addOrSave({ ...projectObj, localPath: project.localPath });

    const { initRepo,
      openRepo,
      saveProject,
      commit,
      definitionPath,
      readmePath,
      coverPath
    } = folders;

    if(project.localPath) {
      let chainStart;

      if(newRepo) {
        chainStart = initRepo(project.localPath)
          .then(() => saveProject(project.localPath, projectObj));
      } else {
        chainStart = saveProject(project.localPath, projectObj);
      }

      const repoFiles = [definitionPath(''), readmePath('')];
      if(project.coverImage) {
        console.log("also add coverImage to repo");
        repoFiles.push(coverPath('', projectObj));
      }

      chainStart
        .then(() => openRepo(project.localPath))
        .then(repo =>
          commit(repo, 'Project update in Disolution',
            { name: gitAuthor || '', email: gitEmail || '' }, repoFiles)
        );
    }

    hashHistory.push('/');
  }

  render() {
    const {
      state: {
        showFolderDialog,
        project: { id, title, article, coverImage, localPath }
      }
    } = this;

    const coverImagePath = localPath && coverImage ?
      encodeURI(path.join(localPath, coverImage) + '?' + new Date().getTime())
    : '';

    return (
      <div style={{ padding: '1em' }}>
        {showFolderDialog ?
          <ProjectOpenDialog onSuccess={this.setLocalPath} />
        : ''}
        <FlatButton
          labelPosition="before"
          style={{ paddingTop: 5, minWidth: 40 }}
          label={<ImageIcon />}
        >
          <input
            type="file"
            accept="image/*"
            onChange={this.setImage}
            onDrop={this.setImage}
            style={styles.exampleImageInput}
          />
        </FlatButton>
        {coverImage ?
          <div
            style={{
              backgroundImage: `url(${coverImagePath})`,
              ...styles.coverImage
            }}
          />
        : ''}
        <Paper zDepth={1} style={styles.container}>
          <Form
            ref={el => { this.form = el; }}
            onSubmit={this.submit.bind(this)}
            onValid={this.setValidState.bind(this, true)}
            onInvalid={this.setValidState.bind(this, false)}
          >
            <FormsyInlineText
              name="title"
              value={title || ''}
              style={{ ...styles.inputs, ...styles.title }}
              multiLine
              maxRows={3}
              hintText="Project title"
              hintStyle={styles.titleHint}
              fullWidth
              required
            />
            <FormsyMarkdown
              name="article"
              value={article || ''}
              options={{ spellChecker: false, placeholder: 'Description' }}
              fullWidth
              required
            />
            <Button
              type="submit"
              label="Save"
              disabled={!this.state.canSubmit}
              primary
            />
          </Form>
        </Paper>
        {localPath ?
          <p>
            Project folder {id ? `(UUID v1: ${id})` : ''}
            <br />
            <small>{localPath}</small>
          </p>
          : ''
        }
      </div>
    );
  }
}
