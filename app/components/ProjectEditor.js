import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import FormsyMarkdown from './FormsyMarkdown';
import FormsyInlineText from './FormsyInlineText';
import { Form } from 'formsy-react';
import ImageIcon from 'material-ui/svg-icons/image/add-a-photo';
import styles from './ProjectEditorStyles';
import * as folders from '../utils/folders';
import uuid from 'node-uuid';

import {
  RaisedButton as Button,
  FlatButton,
  Paper
} from 'material-ui';

export default class ProjectEditor extends React.Component {

  static propTypes = {
    project: PropTypes.object,
    settings: PropTypes.object,
    add: PropTypes.func,
    save: PropTypes.func
  }

  static defaultProps = {
    project: {},
    settings: {}
  }

  state = {
    canSubmit: false,
    project: this.props.project,
    newRepo: false
  }

  componentDidMount() {
    const { props: { project, add } } = this;

    if(!project.id) {
      const localPath = folders.askFolderPath();
      if(localPath) {
        folders.findProjectInPath(localPath).then(scannedProject => {
          if(scannedProject) {
            add({ ...scannedProject, localPath });
            hashHistory.push(`/project-editor/${scannedProject.id}`);
          }
          this.setState({
            newRepo: !scannedProject,
            project: {
              localPath
            }
          });
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { project } = nextProps;
    this.setState({ project });
  }

  submit(data, resetForm) {
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
        repoFiles.push(coverPath('', projectObj));
      }

      chainStart
        .then(() => openRepo(project.localPath))
        .then(repo =>
          commit(repo, 'Project update in Disolution',
            { name: gitAuthor || '', email: gitEmail || '' }, repoFiles)
        );
    }

    resetForm();
    hashHistory.push('/');
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }

  selectImage(e) {
    const { files } = e.target;
    if(files && files.length) {
      const { props: { save }, state: { project } } = this;
      const coverImage = files[0].path;
      const projectObj = { coverImage };
      const imgPath = folders.coverPath(project.localPath, projectObj);
      // const relativePath = folders.coverPath('', projectObj);
      folders.writeCover(coverImage, imgPath).then(() => {
        if(project.id) {
          save({
            id: project.id,
            coverImage: this.state.coverImage
          });
        }
      });
    }
  }

  render() {
    const {
      state: { project: { title, article, coverImage } }
    } = this;

    return (
      <div style={{ padding: '1em' }}>

        <FlatButton
          labelPosition="before"
          style={{ paddingTop: 5, minWidth: 40 }}
          label={<ImageIcon />}
        >
          <input
            type="file"
            accept="image/*"
            onChange={this.selectImage.bind(this)}
            onDrop={this.selectImage.bind(this)}
            style={styles.exampleImageInput}
          />
        </FlatButton>
        {coverImage ?
          <div
            style={{
              backgroundImage: `url(${encodeURI(coverImage)})`,
              ...styles.coverImage
            }}
          />
        : ''}
        <Paper zDepth={1} style={styles.container}>
          <Form
            ref={el => { this.form = el; }}
            onSubmit={this.submit.bind(this)}
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}
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
      </div>
    );
  }
}
