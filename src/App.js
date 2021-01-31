import React from 'react'
import { Switch,Route } from 'react-router';
import Show from './pages/Show'
import Home from './pages/Home';
import { ThemeProvider} from 'styled-components'

import Starred from './pages/Starred'
const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

const App = () => {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path = '/'><Home/></Route>
          <Route exact path = '/starred'><Starred/></Route>
          <Route exact path = '/show/:id'><Show/></Route>
        </Switch>
      </ThemeProvider>
    )
  }
export default App;
