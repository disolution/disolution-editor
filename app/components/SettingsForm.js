import React, { PropTypes } from 'react';
import { Form } from 'formsy-react';
import {
  FormsyText as Text,
  FormsyRadioGroup as RadioButtonGroup,
  FormsyRadio as RadioButton
} from 'formsy-material-ui/lib';

import {
  RaisedButton as Button,
  Subheader,
  Paper
} from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { grey900, indigo800, red800, blue800, brown800 } from 'material-ui/styles/colors';

export default class SettingsForm extends React.Component {

  static propTypes = {
    settings: PropTypes.object,
    update: PropTypes.func
  }

  static defaultProps = {
    settings: {},
    update: (settings) => {
      console.warn('Please provide a cb for submit', settings);
    }
  }

  submit = (settings) => {
    this.props.update(settings);
  }

  render () {
    const { props: { settings: {
      gitAuthor,
      gitEmail,
      mainColor
    } } } = this;
    return (
      <Paper style={{padding: '1em'}}>
        <Form onSubmit={this.submit} onChange={this.submit}>
          <h3>Git author public information</h3>
          <Text name="gitAuthor" value={gitAuthor} floatingLabelText="Name" />
          <br/>
          <Text name="gitEmail" value={gitEmail} floatingLabelText="Email" />
          <h3>Customize main color</h3>
          <RadioButtonGroup name="mainColor" defaultSelected={mainColor}>
            <RadioButton
              value={grey900}
              label="Dark"
              iconStyle={{fill: grey900}}
            />
            <RadioButton
              value={indigo800}
              label="Indigo"
              iconStyle={{fill: indigo800}}
            />
            <RadioButton
              value={red800}
              label="Red"
              iconStyle={{fill: red800}}
            />
            <RadioButton
              value={blue800}
              label="Blue"
              iconStyle={{fill: blue800}}
            />
            <RadioButton
              value={brown800}
              label="Brown"
              iconStyle={{fill: brown800}}
            />
          </RadioButtonGroup>
          <br/><br/>
          <Button type="submit"
            label="Update"
            primary={true} />
        </Form>
      </Paper>
    );
  }
}
