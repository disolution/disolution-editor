import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Disolution</h1>
          <div className="toolbar-actions">
            <Link to='/feed'>
              <button className="btn btn-default">
                <span style={{color:'#3e9bf4'}} className="icon icon-paper-plane icon-text"></span>
                Inbox Feed
              </button>
            </Link>
            <Link to='/new-project'>
              <button className="btn btn-primary pull-right">
                <span style={{color:'white'}} className="icon icon-plus-squared icon-text"></span>
                New Project
              </button>
            </Link>
          </div>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane">
              {this.props.children}
            </div>
          </div>
        </div>
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools'); // eslint-disable-line global-require
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
