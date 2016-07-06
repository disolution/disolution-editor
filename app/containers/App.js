import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import { StickyContainer, Sticky } from 'react-sticky';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { getLuminance } from 'material-ui/utils/colorManipulator';
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LocalIcon from 'material-ui/svg-icons/file/folder';
import RemoteIcon from 'material-ui/svg-icons/file/file-download';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { grey900, grey600, grey200, fullWhite, black } from 'material-ui/styles/colors';
import * as transitions from '../utils/transitions';

import Notifications from './Notifications';

const defaultTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    secondary1Color: grey600
  },
  appBar: {
    height: 50
  }
});

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    route: PropTypes.object,
    settings: PropTypes.object
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
    const { settings } = nextProps;

    if(settings) {
      const { mainColor } = settings;
      if(mainColor) {
        this.setState({
          selectedTheme: getMuiTheme(
            {
              ...defaultTheme,
              appBar: {
                textColor: getLuminance(mainColor) > 0.6 ? black : fullWhite
              },
              palette: {
                primary1Color: mainColor
              }
            }
          )
        });
        document.body.style.backgroundColor = mainColor === black ? grey600 : grey200;
      }
    }
  }

  render() {
    const {
      state: { showMenu, selectedTheme },
      props: { location: { state: locationState, pathname: currentPath } }
    } = this;
    const appTitle = (
      <span className="appbar-title">
      </span>
    );

    const headerIconColor = getLuminance(selectedTheme.palette.primary1Color) > 0.6 ?
      black : fullWhite;

    return (
      <MuiThemeProvider muiTheme={selectedTheme}>
        <div>
          <StickyContainer>
            <Sticky>
              <AppBar
                style={{ WebkitAppRegion: 'drag', WebkitUserSelect: 'none' }}
                title={appTitle}
                showMenuIconButton={(currentPath.trim() !== '/')}
                iconElementLeft={currentPath.trim() !== '/' ?
                    (<IconButton
                      onClick={() => hashHistory.push({
                        path: '/',
                        state: { transition: 'slideLeft' }
                      })}
                    >
                      <BackIcon color={headerIconColor} />
                    </IconButton>)
                  : undefined
                }
                iconElementRight={
                  <div>
                    <IconMenu
                      open={showMenu}
                      onRequestChange={(open) => this.setState({ showMenu: open })}
                      iconButtonElement={
                        <IconButton onClick={() => this.setState({ showMenu: true })}>
                          <AddIcon color={headerIconColor} />
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
                          hashHistory.push('/project-editor');
                        }}
                      />
                    </IconMenu>
                    <IconButton onClick={() => hashHistory.push('/settings')}>
                      <SettingsIcon color={headerIconColor} />
                    </IconButton>
                  </div>
                }
              />
            </Sticky>
            <Notifications />
            {locationState && locationState.transition ?
            (
              <RouteTransition
                pathname={this.props.location.pathname}
                {...(this.props.location.action === 'POP' ?
                  transitions.slideRight
                : transitions[locationState.transition])
                }
              >
                {this.props.children}
              </RouteTransition>
            )
            : this.props.children}
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
