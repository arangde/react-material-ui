import React from "react";
import { ROLES } from "../../../constants";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "27px 0 0",
    position: "relative",
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#aaa !important",
    fontSize: "14px !important",
    transformOrigin: "top left !important",
    transform: "translate(0, 1.5px) scale(0.75) !important"
  },
  saleSelect: {
    '&:after': {
      borderBottom: "2px solid #f44336",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important"
    }
  }
};

class UserDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      name: '',
      email: '',
      role: '',
      password: '',
      password_confirm: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getUser(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { users } = nextProps

    if (users.status !== this.props.users.status) {
      if (users.status === actionTypes.GET_USER_SUCCESS) {
        this.fill(users.user)
      } else if (users.status === actionTypes.GET_USER_FAILURE) {
        this.setState({ error: users.error, enabled: true })
        setTimeout(() => {
          this.props.push('/admin/users')
        }, 3000)
      } else if (users.status === actionTypes.UPDATE_USER_SUCCESS) {
        this.props.push('/admin/users')
      } else if (users.status === actionTypes.UPDATE_USER_FAILURE) {
        this.setState({ error: users.error, enabled: true })
      }
    }
  }

  fill(user) {
    this.setState({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      password_confirm: '',
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
      const user = {
        id: this.id,
        name: this.state.name,
        email: this.state.email,
        role: this.state.role,
      }

      if (this.state.password) {
        user.password = this.state.password
      }

      this.setState({ enabled: false }, () => {
        this.props.updateUser(user)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/users')
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
                <h4 className={classes.cardTitleWhite}>User Details</h4>
                <p className={classes.cardCategoryWhite}>Edit user's info</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.name,
                        name: "name",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        disabled: true,
                        value: this.state.email,
                        name: "email",
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.inputLabel}>Role</InputLabel>
                      <Select
                        className={classes.saleSelect}
                        inputProps={{
                          name: "role",
                          open: this.state.open,
                          onClose: this.handleClose,
                          onOpen: this.handleOpen,
                          onChange: this.handleChange,
                          value: this.state.role
                        }}
                      >
                        {ROLES.map((role, key) => {
                          return <MenuItem value={key} key={key}>{role}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Password"
                      error={this.state.password !== this.state.password_confirm}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password,
                        name: "password",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Password Confirm"
                      error={this.state.password !== this.state.password_confirm}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password_confirm,
                        name: "password_confirm",
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>Save</Button>
                <Button color="transparent" onClick={this.handleCancel}>Cancel</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UserDetail);
