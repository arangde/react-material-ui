/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { authenticate } from 'redux/actions';
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "components/Footer/Footer.jsx";

import homeStyle from "assets/jss/material-dashboard-react/layouts/homeStyle.jsx";

class Home extends React.Component {
  state = {
    mobileOpen: false
  };

  componentWillMount() {
    this.checkAuth(this.props.auth.authenticated);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps.auth.authenticated);
  }

  checkAuth(authenticated) {
    if (!authenticated) {
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

  render() {
    const { classes, auth } = this.props;
    return auth.authenticated && (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <h1>Welcome to MMS!</h1>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
};

export default connect((state) => ({
  'auth': state.auth,
}), { authenticate, push })(withStyles(homeStyle)(Home))
