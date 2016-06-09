import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {AppBar, Badge, IconButton} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import { grey900 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900
  }
});

export default class App extends Component {

  constructor(props) {
    super(props);

    document.addEventListener('dragover',function(e){
      e.preventDefault();
      return false;
    }, false);

    document.addEventListener('drop',function(e){
      e.preventDefault();
      return false;
    }, false);
  }

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const appTitle = (
      <span className="appbar-title">
        <span onClick={() => hashHistory.push('/')}>DISOLUTION <small style={{color:'rgb(252, 105, 255)', fontSize: 10 }}>proto</small></span>
      </span>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <StickyContainer>
            <Sticky>
              <AppBar
                style={{ WebkitAppRegion: 'drag' }}
                title={appTitle}
                showMenuIconButton={false}
                iconElementRight={
                  <IconButton onClick={() => hashHistory.push('/project-editor')}>
                    <AddIcon />
                  </IconButton>
                }
              />
            </Sticky>

            <div>
              {this.props.children}
            </div>
          </StickyContainer>
          {
            (() => {
              if (process.env.NODE_ENV !== 'production') {
                const DevTools = require('./DevTools'); // eslint-disable-line global-require
                return <DevTools />;
              }
            })()
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
