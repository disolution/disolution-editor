import Formsy from 'formsy-react';
import React, { PropTypes } from 'react';
import MarkdownArea from './MarkdownArea.js';

/* eslint-disable react/prefer-es6-class */
const FormsyMarkdown = React.createClass({
  propTypes: {
    onChange: PropTypes.func
  },
  mixins: [Formsy.Mixin],
  changeValue(value) {
    this.setValue(value);

    const { props: { onChange } } = this;
    if(onChange) {
      onChange(value);
    }
  },
  render() {
    const className = (this.showRequired() ? 'required ' : null) +
      (this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <MarkdownArea {...this.props} value={this.getValue()} onChange={this.changeValue} />
        <span>{errorMessage}</span>
      </div>
    );
  }
});
/* eslint-enable react/prefer-es6-class */

export default FormsyMarkdown;
