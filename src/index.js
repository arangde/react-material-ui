import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from "react-router-dom"
import store, { history } from './store'
import indexRoutes from "routes/index.jsx"

import "assets/css/material-dashboard-react.css?v=1.3.0"
import './style.css'

require('dotenv').config()

render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
