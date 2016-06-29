import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LocalIcon from 'material-ui/svg-icons/file/folder';
import RemoteIcon from 'material-ui/svg-icons/file/file-download';
import { grey900, grey600 } from 'material-ui/styles/colors';

import Notifications from './Notifications';

const defaultTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    secondary1Color: grey600,
  }
});

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      return false;
    }, false);

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      return false;
    }, false);
  }

  state = {
    selectedTheme: defaultTheme,
    showMenu: false
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.settings) {
      const { mainColor } = nextProps.settings;
      if(mainColor) {
        this.setState({
          selectedTheme: getMuiTheme({
            palette: {
              primary1Color: mainColor,
              secondary1Color: grey600,
            }
          })
        });
      }
    }
  }

  render() {
    const { state: { showMenu, selectedTheme } } = this;
    const appTitle = (
      <span className="appbar-title">
        <span onClick={() => hashHistory.push('/')}>
          DISOLUTION
          <small style={{ fontSize: 10 }}>proto</small>
        </span>
      </span>
    );

    return (
      <MuiThemeProvider muiTheme={selectedTheme}>
        <div>
          <StickyContainer>
            <Sticky>
              <AppBar
                style={{ WebkitAppRegion: 'drag' }}
                title={appTitle}
                showMenuIconButton={false}
                iconElementRight={
                  <div>
                    <IconMenu
                      open={showMenu}
                      onRequestChange={(showMenu) => this.setState({ showMenu })}
                      iconButtonElement={
                        <IconButton onClick={() => this.setState({ showMenu: true })}>
                          <AddIcon color="white" />
                        </IconButton>
                      }
                      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                      <MenuItem
                        leftIcon={<LocalIcon />}
                        primaryText="Add local project"
                        onClick={() => {
                          this.setState({ showMenu: false });
                          hashHistory.push('/project-editor');
                        }}
                      />
                      <MenuItem
                        leftIcon={<RemoteIcon />}
                        primaryText="Add remote project"
                        onClick={() => {
                          this.setState({ showMenu: false });
                          window.alert('Git clone not implemented yet');
                          hashHistory.push('/project-editor');
                        }}
                      />
                    </IconMenu>
                    <IconButton onClick={() => hashHistory.push('/settings')}>
                      <SettingsIcon color="white" />
                    </IconButton>
                  </div>
                }
              />
            </Sticky>
            <Notifications />
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

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export const AppContainer = connect(mapStateToProps)(App);
