import React, { PropTypes } from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';

const FormsyInlineText = React.createClass({

  propTypes: {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    value: PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  componentWillMount() {
    this.setValue(this.props.defaultValue || this.props.value || '');
  },

  handleChange: function handleChange(event) {
    this.setValue(event.currentTarget.value);
    if(this.props.onChange) {
      this.props.onChange(event);
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if(keycode(event) === 'enter') {
      this.setValue(event.currentTarget.value);
    }
    if(this.props.onKeyDown) {
      this.props.onKeyDown(event, event.currentTarget.value);
    }
  },

  render() {
    const { props } = this;
    return (
      <TextField
        {...props}
        errorText={this.getErrorMessage()}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.getValue()}
      />
    );
  },
});

export default FormsyInlineText;
