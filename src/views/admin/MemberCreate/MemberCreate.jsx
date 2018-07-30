import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Button from "components/admin/CustomButtons/Button.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import CardFooter from "components/admin/Card/CardFooter.jsx";
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
    fontSize: "18px !important",
    transformOrigin: "top left !important",
    transform: "translate(0, 1.5px) scale(0.75) !important"
  },
  saleSelect: {
    '&:after': {
      borderBottom: "2px solid #f44336",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
    }
  }
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
      refer_id: '',
      enabled: false,
      error: '',
    }
    this.props.getMembers()
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
      [event.target.name]: event.target.value,
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
        entry_date: this.state.entry_date,
        refer_id: this.state.refer_id,
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
    const { classes, members } = this.props

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
                      error={!this.state.name}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "name",
                        onChange: this.handleChange,
                        value: this.state.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      error={!this.state.email}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "email",
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
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "phone_number",
                        onChange: this.handleChange,
                        value: this.state.phone_number
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Bank card number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "card_number",
                        onChange: this.handleChange,
                        value: this.state.card_number
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Entry date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        name: "entry_date",
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
                      error={!(this.state.password && this.state.password === this.state.password_confirm)}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "password",
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password
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
                        name: "password_confirm",
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password_confirm,
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.inputLabel}>Referenced by</InputLabel>
                      <Select
                        className={classes.saleSelect}
                        inputProps={{
                          name: "refer_id",
                          open: this.state.open,
                          onClose: this.handleClose,
                          onOpen: this.handleOpen,
                          onChange: this.handleChange,
                          value: this.state.refer_id,
                        }}
                      >
                        {members.members.map((member, key) => {
                          return <MenuItem value={member.id} key={key} className={classes.optionSelect}>{member.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
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