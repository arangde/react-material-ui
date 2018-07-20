/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "views/LoginForm/LoginForm.jsx";
import Footer from "components/Footer/Footer.jsx";

import loginStyle from "assets/jss/material-dashboard-react/layouts/loginStyle.jsx";

class Login extends React.Component {
  state = {
    mobileOpen: false
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <LoginForm />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginStyle)(Login);
