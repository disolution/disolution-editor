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
import { grey900, green600, red600, purple600, pink600 } from 'material-ui/styles/colors';

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
      git_author,
      git_email,
      mainColor
    } } } = this;
    return (
      <Paper style={{padding: '1em'}}>
        <Form onSubmit={this.submit}>
          <h3>Git author public information</h3>
          <Text name="git_author" value={git_author} floatingLabelText="Name" />
          <br/>
          <Text name="git_email" value={git_email} floatingLabelText="Email" />
          <h3>Customize main color</h3>
          <RadioButtonGroup name="mainColor" defaultSelected={mainColor}>
            <RadioButton
              value={grey900}
              label="Darkside"
              iconStyle={{fill: grey900}}
              checkedIcon={<ActionFavorite/>}
              uncheckedIcon={<ActionFavoriteBorder />}
            />
            <RadioButton
              value={green600}
              label="Green"
              iconStyle={{fill: green600}}
              checkedIcon={<ActionFavorite/>}
              uncheckedIcon={<ActionFavoriteBorder />}
            />
            <RadioButton
              value={red600}
              label="Red"
              iconStyle={{fill: red600}}
              checkedIcon={<ActionFavorite/>}
              uncheckedIcon={<ActionFavoriteBorder />}
            />
            <RadioButton
              value={purple600}
              label="Purple"
              iconStyle={{fill: purple600}}
              checkedIcon={<ActionFavorite/>}
              uncheckedIcon={<ActionFavoriteBorder />}
            />
            <RadioButton
              value={pink600}
              label="Pink"
              iconStyle={{fill: pink600}}
              checkedIcon={<ActionFavorite/>}
              uncheckedIcon={<ActionFavoriteBorder />}
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
