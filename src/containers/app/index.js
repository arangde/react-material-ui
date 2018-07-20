import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Dashboard from "layouts/Dashboard/Dashboard.jsx"

const App = () => (
  <div>
    <header>
      <Link to="/">Dashboard</Link>
      <Link to="/home">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App