/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import { authenticate } from 'redux/actions';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false,
    loggedIn: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentWillMount() {
    this.checkAuth(this.props.isAuthenticated);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps.isAuthenticated);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.initializeScrollbar();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.history.location.pathname !== prevProps.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }

    if (prevState.loggedIn !== this.state.loggedIn && this.state.loggedIn) {
      this.initializeScrollbar();
    }
  }

  checkAuth(isAuthenticated) {
    if (!isAuthenticated) {
      const token = localStorage.getItem('token');

      if (!token) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.push(`/login?next=${redirectAfterLogin}`);
      }
      else {
        this.props.authenticate(token);
      }
    } else {
      if (!this.state.loggedIn) {
        this.setState({ loggedIn: true });
      }
    }
  }

  initializeScrollbar() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  render() {
    const { classes, isAuthenticated, ...rest } = this.props;

    return isAuthenticated && (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Creative Tim"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
};

export default connect((state) => ({
  'isAuthenticated': state.auth.isAuthenticated,
}), { authenticate, push })(withStyles(dashboardStyle)(App))
