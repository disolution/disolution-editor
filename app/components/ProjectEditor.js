import React, { PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
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
  Paper,
  FontIcon,
  FloatingActionButton
} from 'material-ui';

const props = {
  inputs: {
    fullWidth: true,
    required: true
  }
};

export default class ProjectEditor extends React.Component {
  state = {
    canSubmit: false,
    coverImage: '',
    localPath: '',
    newRepo: false
  }

  static propTypes = {
    project: PropTypes.object,
    add: PropTypes.func,
    save: PropTypes.func,
  }

  static defaultProps = {
    project: {},
    settings: {}
  }

  componentWillReceiveProps(nextProps) {
    const { project } = nextProps;
    this.form.reset();
    this.setState({
      coverImage: project.coverImage || ''
    });
  }

  componentDidMount() {
    const { props: { project, add } } = this;
    this.setState({
      coverImage: project.coverImage || '',
    });

    if(!project.id) {
      let localPath = folders.askFolderPath();
      if(localPath) {
        folders.findProjectInPath(localPath).then(
          r => {
            if(r) {
              add({...r, localPath});
              hashHistory.push('/project-editor/'+r.id);
            }
            console.log('got project', r);
            this.setState({
              newRepo: !r,
              localPath
            });
          }, e => console.log('got err', e));
      }
    }
  }

  submit(data, resetForm) {
    const { title, article } = data;
    const {
      form,
      props: { add, save, project, settings: { git_author, git_email } },
      state: { coverImage, newRepo }
    } = this;

    const localPath = project.id ? project.localPath : this.state.localPath;
    console.log("setting localPath for existing", localPath, 'newrepo', newRepo);

    const projectObj = {
      id: project.id || uuid.v1(),
      title,
      article,
      coverImage
    };
    const addOrSave = project.id ? save : add;
    addOrSave({ ...projectObj, localPath });

    const { initRepo, openRepo, saveProject, commit, definitionPath, readmePath, coverPath } = folders;
    if(localPath) {
      let chainStart;
      if(newRepo) {
        chainStart = initRepo(localPath)
          .then((repo) => saveProject(localPath, projectObj))
      } else {
        chainStart = saveProject(localPath, projectObj);
      }
      const repo_files = [definitionPath(''), readmePath(''), coverPath('', projectObj)];
      chainStart
        .then(() => openRepo(localPath))
        .then(repo => commit(repo, 'Project update in Disolution', { name: git_author || '', email: git_email || '' }, repo_files))
        .catch(err => console.error("saving err", err));
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
      const { props: { project } } = this;
      const localPath = project.id ? project.localPath : this.state.localPath;
      let coverImage = files[0].path;
      const projectObj = { coverImage };
      const imgPath = folders.coverPath(localPath, projectObj);
      const relativePath = folders.coverPath('', projectObj);
      folders.writeCover(coverImage, imgPath).then((p) => {
        console.log('cover copied to', p);
        this.setState({
          coverImage: imgPath
        });
        const { props: { project, save } } = this;
        if(project.id) {
          save({
            id: project.id,
            coverImage: this.state.coverImage
          });
        }
      }).catch(e => console.error(e));
    }
  }

  render() {
    const {
      props: { project },
      state: { coverImage }
    } = this;

    return (
      <div style={{padding: '1em'}}>
        <FlatButton labelPosition="before" style={{paddingTop: 5, minWidth: 40}} label={<ImageIcon />}>
          <input type="file" accept="image/*" onChange={this.selectImage.bind(this)} onDrop={this.selectImage.bind(this)} style={styles.exampleImageInput} />
        </FlatButton>
        { coverImage.length ?
          <div style={{backgroundImage: 'url('+encodeURI(coverImage)+')', ...styles.coverImage}} />
        : '' }
        <Paper zDepth={1} style={styles.container}>
          <Form
            ref={el => this.form = el}
            onSubmit={this.submit.bind(this)}
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}>
            <FormsyInlineText
              name="title"
              value={project.title || ''}
              style={{...styles.inputs, ...styles.title}}
              multiLine={true}
              maxRows={3}
              hintText="Project title"
              hintStyle={styles.titleHint}
              {...props.inputs} />
            <FormsyMarkdown
              name="article"
              value={project.article || ''}
              options={{spellChecker: false, placeholder: 'Description'}}
              {...props.inputs} />
            <Button type="submit"
              label="Save"
              disabled={!this.state.canSubmit}
              primary={true} />
          </Form>
        </Paper>
      </div>
    );
  }
}
