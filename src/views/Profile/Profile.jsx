import React from "react";
import classNames from "classnames";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Alert from "components/Alert/Alert.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import * as actionTypes from 'redux/actionTypes'

const styles = {
  ...landingPageStyle,
  form: {
    marginTop: '60px',
    marginBottom: '40px'
  },
  divider: {
    margin: '40px 0'
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      phone_number: '',
      card_number: '',
      entry_date: moment().format('YYYY-MM-DD'),
      password: '',
      password_confirm: '',
      point: '',
      balance: '',
      next_period_date: '',
      referncedName: '',
      referncedEmail: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;

    if (profile.status !== this.props.profile.status) {
      if (profile.status === actionTypes.GET_PROFILE_SUCCESS) {
        this.fill(profile.member)
      } else if (profile.status === actionTypes.GET_PROFILE_FAILURE) {
        this.setState({ error: profile.error, enabled: true })
        setTimeout(() => {
          this.props.push('/')
        }, 3000)
      } else if (profile.status === actionTypes.SAVE_PROFILE_SUCCESS) {
        this.props.push('/')
      } else if (profile.status === actionTypes.SAVE_PROFILE_FAILURE) {
        this.setState({ error: profile.error, enabled: true })
      }
    }
  }

  fill(member) {
    this.setState({
      name: member.name,
      email: member.email,
      phone_number: member.phone_number,
      card_number: member.card_number,
      entry_date: moment(member.entry_date).format('YYYY-MM-DD'),
      password: '',
      password_confirm: '',
      point: member.point,
      balance: member.balance,
      next_period_date: moment(member.next_period_date).format('YYYY-MM-DD'),
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      const { password, password_confirm } = this.state
      this.setState({ enabled: password === password_confirm })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const member = {
        card_number: this.state.card_number,
        phone_number: this.state.phone_number,
      }

      if (this.state.password) {
        member.password = this.state.password
      }

      this.setState({ enabled: false }, () => {
        this.props.saveProfile(member)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/')
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Alert message={this.state.error} />
        <Header
          color="transparent"
          brand="Membership"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Update Your Profile</h1>
                <h4>You can only update phone number, bank card number and password.</h4>
                <br />
                <Button color="danger" href="/" rel="back to home">
                  Back to Home
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem cs={12} sm={12} md={8}>
                <form className={classes.form}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Points"
                        id="point"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.point
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Balance"
                        id="balance"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.balance
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Next period date"
                        id="next_period_date"
                        formControlProps={{
                          fullWidth: true
                        }}
                        labelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          type: "date",
                          disabled: true,
                          value: this.state.next_period_date
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Referenced by"
                        id="referncedName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.referncedName
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Entry date"
                        id="entry_date"
                        formControlProps={{
                          fullWidth: true
                        }}
                        labelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          type: "date",
                          disabled: true,
                          value: this.state.entry_date
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <div className={classes.divider} />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Phone number"
                        id="phone_number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.phone_number
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Back card number"
                        id="card_number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.card_number
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Password"
                        id="password"
                        error={this.state.password !== this.state.password_confirm}
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: this.handleChange,
                          value: this.state.password
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Password Confirm"
                        id="password_confirm"
                        error={this.state.password !== this.state.password_confirm}
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: this.handleChange,
                          value: this.state.password_confirm
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                      <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>Save Profile</Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
