import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import FormsyMarkdown from './FormsyMarkdown.js';
import { Form } from 'formsy-react';
import { FormsyText as Text } from 'formsy-material-ui/lib';
import ImageIcon from 'material-ui/svg-icons/image/add-a-photo';

import styles from './ProjectEditorStyles';
import { askFolderPath } from '../utils/folders';

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
    coverImage: ''
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
    const { props: { project } } = this;
    this.setState({
      coverImage: project.coverImage || '',
    });
  }

  submit(data, resetForm) {
    const { title, article } = data;
    const {
      form,
      props: { add, save, projects, project },
      state: { coverImage }
    } = this;

    // let projectPath = askFolderPath();
    // console.log("projectPath received", projectPath);

    const addOrSave = project.id ? save : add;
    addOrSave({
      id: project.id || (projects.length + 1).toString(),
      title,
      article,
      coverImage
    });
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
