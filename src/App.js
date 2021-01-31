import React from 'react'
import { Switch,Route } from 'react-router';
import Show from './pages/Show'
import Home from './pages/Home';


import Starred from './pages/Starred'

const App = () => (
      <Switch>
        <Route exact path = '/'><Home/></Route>
        <Route exact path = '/starred'><Starred/></Route>
        <Route exact path = '/show/:id'><Show/></Route>
      </Switch>
  )

export default App;
