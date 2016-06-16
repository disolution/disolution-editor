import React, { PropTypes } from 'react'
import { Form } from 'formsy-react'
import { FormsyText as Text } from 'formsy-material-ui/lib'
import {
  RaisedButton as Button,
  Subheader,
  Paper,
  RadioButtonGroup,
  RadioButton
} from 'material-ui'

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
    const { props: { settings } } = this;
    return (
      <Paper style={{padding: '1em'}}>
        <Form onSubmit={this.submit}>
          <h3>Git author public information</h3>
          <Text name="git_author" value={settings.git_author} floatingLabelText="Name" />
          <br/>
          <Text name="git_email" value={settings.git_email} floatingLabelText="Email" />
          <h3>Customize Disolution</h3>

          <br/><br/>
          <Button type="submit"
            label="Update"
            primary={true} />
        </Form>
      </Paper>
    );
  }
}
