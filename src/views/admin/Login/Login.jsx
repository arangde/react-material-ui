import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Button from "components/admin/CustomButtons/Button.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import CardFooter from "components/admin/Card/CardFooter.jsx";
import Alert from "components/admin/Alert/Alert.jsx";
import Footer from "components/admin/Footer/Footer.jsx";

import loginStyle from "assets/jss/material-dashboard-react/layouts/loginStyle.jsx";
import * as actionTypes from 'redux/actionTypes'

const styles = {
  ...loginStyle,
  cardTitle: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardFooter: {
    margin: "1rem auto",
  },
};

class Login extends React.Component {
  static propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      enabled: false,
      error: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (auth.status !== this.props.auth.status) {
      if (auth.status === actionTypes.ADMIN_LOGIN_SUCCESS) {
        let redirectTo = 'admin/';
        if (this.props.location.search) {
          const query = queryString.parse(this.props.location.search);
          redirectTo = query.next || redirectTo;
        }
        this.props.push(redirectTo)
      } else if (auth.status === actionTypes.ADMIN_LOGIN_FAILURE) {
        this.setState({ error: auth.error, enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      this.setState({ enabled: this.state.email && this.state.password })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', })

    if (this.state.enabled) {
      const { email, password } = this.state

      this.setState({ enabled: false }, () => {
        this.props.loginAdmin(email, password)
      })
    }
    return false
  }

  render() {
    const { classes } = this.props;
    const { email, password, enabled, error } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <Alert message={error} />
              <Grid container>
                <GridItem xs={12} sm={2} md={4}></GridItem>
                <GridItem xs={12} sm={8} md={4}>
                  <Card>
                    <CardHeader color="primary">
                      <h3 className={classes.cardTitle}>Welcome to MMS!</h3>
                    </CardHeader>
                    <CardBody>
                      <Grid container>
                        <GridItem xs={12}>
                          <CustomInput
                            labelText="Email address"
                            id="email"
                            value={email}
                            formControlProps={{
                              fullWidth: true,
                              required: true,
                            }}
                            inputProps={{
                              onChange: this.handleChange,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12}>
                          <CustomInput
                            labelText="Password"
                            id="password"
                            value={password}
                            formControlProps={{
                              fullWidth: true,
                              required: true,
                            }}
                            inputProps={{
                              type: "password",
                              onChange: this.handleChange,
                            }}
                          />
                        </GridItem>
                      </Grid>
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        className={classes.cardFooter}
                        disabled={!enabled}
                        onClick={this.handleSubmit}
                      >Login</Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </Grid>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
