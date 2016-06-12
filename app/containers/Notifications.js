import React, { Component, PropTypes } from 'react';
import { Snackbar } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NotificationActions from '../actions/notifications';

class Notifications extends Component {
  state = {
    message: '',
    open: false
  };

  static propTypes = {
    message: PropTypes.string,
    clear: PropTypes.func
  };

  handleRequestClose = () => {
    const { props: { clear } } = this;
    this.setState({
      message: '',
      open: false
    });
    clear();
  };

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;

    if(message && message.length) {
      this.setState({
        message,
        open: true
      });
    }
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    message: state.notifyMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotificationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
