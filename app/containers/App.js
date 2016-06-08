import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {AppBar, Badge, IconButton} from 'material-ui';
import HelpIcon from 'material-ui/svg-icons/action/info';
import { grey900 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  // spacing: {
  //   iconSize: 24,
  //   desktopGutter: 24,
  //   desktopGutterMore: 32,
  //   desktopGutterLess: 16,
  //   desktopGutterMini: 8,
  //   desktopKeylineIncrement: 64,
  //   desktopDropDownMenuItemHeight: 32,
  //   desktopDropDownMenuFontSize: 15,
  //   desktopDrawerMenuItemHeight: 48,
  //   desktopSubheaderHeight: 48,
  //   desktopToolbarHeight: 56,
  // },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: grey900,
    // primary2Color: cyan700,
    // primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
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
    const appTitle = <span className="appbar-title" onClick={() => hashHistory.push('/')}>DISOLUTION</span>;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <StickyContainer>
            <Sticky>
              <AppBar
                style={{ WebkitAppRegion: 'drag' }}
                title={appTitle}
                // showMenuIconButton={false}
                iconElementRight={
                  <IconButton onClick={() => hashHistory.push('/new-project')}>
                    <HelpIcon />
                  </IconButton>
                }
              />
            </Sticky>

            <div style={{padding:'1em'}}>
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
