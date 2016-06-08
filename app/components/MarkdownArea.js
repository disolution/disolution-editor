import SimpleMDE from 'simplemde';
import React, { PropTypes } from 'react';

class MarkdownArea extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    options: React.PropTypes.object,
    onChange: React.PropTypes.func
  };

  componentDidMount() {
    const allOptions = { element: this._textarea, ...(this.props.options || {})};
    let simplemde = this.simplemde = new SimpleMDE(allOptions);

    if(simplemde && simplemde.codemirror && this.props.onChange) {
      simplemde.codemirror.on("change", () => {
        this.props.onChange(simplemde.value());
      });
    }
  }

  componentWillUnmount() {
    let { simplemde } = this;
    if(simplemde) {
      simplemde.toTextArea();
      simplemde = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.simplemde.value(nextProps.value);
  }

  render () {
    const { props: { value } } = this;
    return (
      <textarea ref={(c) => this._textarea = c}>{value}</textarea>
    );
  }
}


export default MarkdownArea;
