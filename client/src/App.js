import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Layout from './components/layout/Layout';

const theme = createMuiTheme();

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="app">
                <Layout />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
