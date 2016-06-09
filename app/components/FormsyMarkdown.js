import Formsy from 'formsy-react';
import React, { PropTypes } from 'react';
import MarkdownArea from './MarkdownArea.js';

const FormsyMarkdown = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(value) {
    this.setValue(value);
  },
  render() {
    const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <MarkdownArea onChange={this.changeValue} {...this.props}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

export default FormsyMarkdown;
