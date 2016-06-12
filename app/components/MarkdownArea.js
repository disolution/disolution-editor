import SimpleMDE from 'simplemde';
import React, { PropTypes } from 'react';

class MarkdownArea extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    options: React.PropTypes.object,
    onChange: React.PropTypes.func
  };

  state = {
    value: undefined
  };

  componentDidMount() {
    const { props: { options, value, onChange }, _textarea } = this;
    const allOptions = { element: _textarea, ...(options || {})};
    let simplemde = this.simplemde = new SimpleMDE(allOptions);

    if(simplemde) {
      simplemde.value(value);
      if( simplemde.codemirror && onChange ) {
        simplemde.codemirror.on("change", (ar, arr) => {
          let value = simplemde.value();
          this.setState({ value });
          onChange(value);
        });
      }
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
    let { state: { value }, props: { value: defaultValue } } = this;

    if(value !== nextProps.value && nextProps.value !== defaultValue) {
      this.simplemde.value(nextProps.value ? nextProps.value : '');
    }
  }

  render () {
    return (
      <textarea ref={(c) => this._textarea = c} />
    );
  }
}


export default MarkdownArea;
