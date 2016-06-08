import React, { Component } from 'react';
import { Link } from 'react-router';
import MarkdownArea from './MarkdownArea.js';
import { Form } from 'formsy-react';
import { FormsyText as Text } from 'formsy-material-ui/lib';

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
    fontSize:'.5em',
    bottom:20
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
    article: ''
  };

  submit(data) {
    alert('test' + JSON.stringify({...data, ...this.state}, null, 4));
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }

  articleChange(value) {
    this.setState({
      article: value
    });
  }

  selectImage(e) {
    const { files } = e.target;
    if(files && files.length) {
      this.setState({
        coverImage: files[0].path
      });
      console.log("selectImage", files[0].path);
    }
  }

  render() {
    //<Text name="article" style={styles.inputs} onKeyUp={this.enableButton.bind(this)} multiLine={true} hintText="Description" hintStyle={{top:12}} rows={10} underlineShow={false} {...props.inputs} />
    return (
      <div>
        { this.state.coverImage.length ?
          <div style={{backgroundImage: 'url('+this.state.coverImage+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: 200, borderRadius: '4px 4px 0 0'}} />
        :
          <FlatButton
            labelPosition="before"
            label="Add cover image"
            icon={<FontIcon className="muidocs-icon-custom-github" />}>
            <input type="file" accept="image/*" onChange={this.selectImage.bind(this)} onDrop={this.selectImage.bind(this)} style={styles.exampleImageInput} />
          </FlatButton>
        }
        <Paper zDepth={1} style={{ padding: '1em', paddingTop: '.5em' }}>
          <Form onSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
            <Text name="title" style={{...styles.inputs, ...styles.title}} multiLine={true} maxRows={3} hintText="Project title" hintStyle={styles.titleHint} {...props.inputs} />
            <MarkdownArea onChange={this.articleChange.bind(this)} options={{spellChecker: false, placeholder: 'Description'}}/>
            <div>
              <Button type="submit" label="Save" disabled={!this.state.canSubmit} primary={true} />

            </div>
          </Form>
        </Paper>
        <p>TODO: <br/> To show the change history by contributor to Project Title, Description and Cover image from project commit history in here</p>
      </div>
    );
  }
}
