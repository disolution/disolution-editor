import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import FormsyMarkdown from './FormsyMarkdown.js';
import { Form } from 'formsy-react';
import { FormsyText as Text } from 'formsy-material-ui/lib';
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

export default class ProjectEditor extends Component {
  state = {
    canSubmit: false,
    coverImage: '',
    localPath: '',
    newRepo: false
  };

  static propTypes = {
    projects: PropTypes.array,
    project: PropTypes.object,
    add: PropTypes.func,
    save: PropTypes.func,
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

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
      } else {
        alert('Please select a folder to save the project as a GIT project');
      }
    }
  }

  submit(data, resetForm) {
    const { title, article } = data;
    const {
      form,
      props: { add, save, projects, project },
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

    if(newRepo && localPath) {
      folders.initRepo(localPath, projectObj).then(() => {
        console.log("initRepo success");
      }).catch(err => console.error("initRepo err", err));
    } else {
      const docnPath = folders.definitionPath(localPath);
      const readmePath = folders.readmePath(localPath);
      folders.writeProject(docnPath, projectObj)
        .then((docnPath) => console.log('successfully written project.json', docnPath));
      folders.writeReadme(readmePath, projectObj)
        .then((mdPath) => console.log('successfully written README.md', mdPath));
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
      this.setState({
        coverImage: files[0].path
      });
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
          <div style={{backgroundImage: 'url('+coverImage+')', ...styles.coverImage}} />
        : '' }
        <Paper zDepth={1} style={styles.container}>
          <Form
            ref={el => this.form = el}
            onSubmit={this.submit.bind(this)}
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}>
            <Text
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
