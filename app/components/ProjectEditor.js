import React, { Component } from 'react';
import { Link } from 'react-router';
import FormsyMarkdown from './FormsyMarkdown.js';
import { Form } from 'formsy-react';
import { FormsyText as Text } from 'formsy-material-ui/lib';
import ImageIcon from 'material-ui/svg-icons/image/add-a-photo';


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

const styles = {
  container: {
    padding: '1em',
    paddingTop: '.5em'
  },
  inputs: {
    width: '100%'
  },
  title: {
    fontSize: '2em',
    height: '2em',
    lineHeight: '1.1em',
    paddingBottom: 10
  },
  titleHint: {
    fontSize:'.8em',
    bottom:20
  },
  coverImage: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 200,
    borderRadius: '4px 4px 0 0'
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  }
};

export default class ProjectEditor extends Component {
  state = {
    canSubmit: false,
    coverImage: '',
    editing: false
  };

  componentDidMount() {
    const { props: { project } } = this;
    if(project.id) {
      this.setState({
        coverImage: project.coverImage,
        editing: true
      });
    }
  }

  static propTypes = {
    projects: React.PropTypes.array,
    project: React.PropTypes.object,
    add: React.PropTypes.func,
    save: React.PropTypes.func,
  };

  static defaultProps = {
    projects: [],
    project: {}
  };

  submit(data) {
    const { title, article } = data;
    const {
      props: { add, save, projects, project },
      state: { coverImage, editing }
    } = this;
    const addOrSave = editing ? save : add;
    addOrSave({
      id: project.id || (projects.length + 1).toString(),
      title,
      article,
      coverImage
    });
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
      state: { editing, coverImage }
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
          <Form onSubmit={this.submit.bind(this)}
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}>
            <Text
              name="title"
              value={project.title || ''}
              style={{...styles.inputs, ...styles.title}}
              multiLine={true}
              maxRows={3}
              hintText="Project title"
              hintStyle={styles.titleHint}
              {...props.inputs} />
            <FormsyMarkdown
              name="article"
              value={project.article || undefined}
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
