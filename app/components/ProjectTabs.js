import React, { Component, PropTypes } from 'react';

export default class ProjectTabs extends Component {
  render() {
    return (
      <header className="toolbar toolbar-header">
        <div className="tab-group">
          <div className="tab-item active">
            <span className="icon icon-cancel icon-close-tab"></span>
            Project #1
          </div>
          <div className="tab-item">
            <span className="icon icon-cancel icon-close-tab"></span>
            Project #2
          </div>
          <div className="tab-item tab-item-fixed">
            <span className="icon icon-plus"></span>
          </div>
        </div>
      </header>
    );
  }
}
