import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Alert from "components/Alert/Alert.jsx";

import checkboxAndRadioStyle from "assets/jss/material-dashboard-react/checkboxAndRadioStyle.jsx";
import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import * as actionTypes from 'redux/actionTypes'

const styles = {
  ...checkboxAndRadioStyle,
  ...cardStyle,
};

class MemberCreate extends React.Component {
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
      referncedName: '',
      enabled: false,
      error: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { members } = nextProps;

    if (members.status !== this.props.members.status) {
      if (members.status === actionTypes.CREATE_MEMBER_SUCCESS) {
        this.props.push('/admin/members')
      } else if (members.status === actionTypes.CREATE_MEMBER_FAILURE) {
        this.setState({ error: members.error, enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      const { name, email, password, password_confirm } = this.state
      this.setState({ enabled: name && email && password && (password === password_confirm) })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const member = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        card_number: this.state.card_number,
        phone_number: this.state.phone_number,
        entry_date: this.state.entry_date
      }

      this.setState({ enabled: false }, () => {
        this.props.createMember(member)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/members')
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create Member</h4>
                <p className={classes.cardCategoryWhite}>Enter member's detail</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      error={!this.state.name}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      error={!this.state.email}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        type: "email",
                        onChange: this.handleChange,
                        value: this.state.email
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
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
                  <GridItem xs={12} sm={12} md={4}>
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
                  <GridItem xs={12} sm={12} md={4}>
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
                        onChange: this.handleChange,
                        value: this.state.entry_date
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      error={!(this.state.password && this.state.password === this.state.password_confirm)}
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
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Referenced by"
                      id="referncedName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        readOnly: true,
                        value: this.state.referncedName
                      }}
                      helperText={<a onClick={this.handleRefer}>click here to select</a>}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>Create</Button>
                <Button color="transparent" onClick={this.handleCancel}>Cancel</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MemberCreate);
