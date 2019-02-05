import React from 'react'
import { Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Home from '../home'

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#1769aa',
      main: '#2196f3',
      light: '#4dabf5',
    },
    secondary: {
      dark: '#a74b00',
      main: '#ef6c00',
      light: '#f28933',
    }
  },
  typography: {
    useNextVariants: true,
  },
})

const styles = {
  paddingTop: '50px',
  paddingBottom: '50px'
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <main>
      <div style={styles}>
        <Route exact path='/' component={Home} />
      </div>
    </main>
  </MuiThemeProvider>
)

export default App
