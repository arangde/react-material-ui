import React from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Alert from "components/Alert/Alert.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import image from "assets/img/bg7.jpg";

import * as actionTypes from 'redux/actionTypes'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: '',
      enabled: false,
      error: '',
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (auth.status !== this.props.auth.status) {
      if (auth.status === actionTypes.AUTH_LOGIN_SUCCESS) {
        let redirectTo = '/';
        if (this.props.location.search) {
          const query = queryString.parse(this.props.location.search);
          redirectTo = query.next || redirectTo;
        }
        this.props.push(redirectTo)
      } else if (auth.status === actionTypes.AUTH_LOGIN_FAILURE) {
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
        this.props.login(email, password)
      })
    }
    return false
  }

  render() {
    const { classes, ...rest } = this.props;
    const { email, password, enabled, error } = this.state;

    return (
      <div>
        <Alert message={error} />
        <Header
          absolute
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Welcome to Membership!</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          value: email,
                          onChange: this.handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          value: password,
                          onChange: this.handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="primary" disabled={!enabled} onClick={this.handleSubmit}>
                        Login
                      </Button>
                      <p className={classes.divider}>
                        <Link to="/admin/login">Log in to Admin -></Link>
                      </p>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(Login);
