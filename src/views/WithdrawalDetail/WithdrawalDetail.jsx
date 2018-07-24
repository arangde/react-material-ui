import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
import * as actionTypes from 'redux/actionTypes'

const styles = {
  ...checkboxAndRadioStyle,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative"
  }
};

class WithdrawalDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      name: '',
      balance: '',
      requested_date: '',
      amount: '',
      note: '',
      reject_reason: '',
      accepted: true,
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getWithdrawal(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { withdrawals } = nextProps;

    if (withdrawals.status !== this.props.withdrawals.status) {
      if (withdrawals.status === actionTypes.GET_WITHDRAWAL_SUCCESS) {
        this.fill(withdrawals.withdrawal)
      } else if (withdrawals.status === actionTypes.GET_WITHDRAWAL_FAILURE) {
        this.setState({ error: withdrawals.error, enabled: true })
        setTimeout(() => {
          this.props.push('/admin/withdrawals')
        }, 3000)
      } else if (withdrawals.status === actionTypes.PROCESS_WITHDRAWAL_SUCCESS) {
        this.props.push('/admin/withdrawals')
      } else if (withdrawals.status === actionTypes.PROCESS_WITHDRAWAL_FAILURE) {
        this.setState({ error: withdrawals.error, enabled: true })
      }
    }
  }

  fill(withdrawal) {
    this.setState({
      name: withdrawal.member.name,
      balance: withdrawal.member.balance,
      requested_date: moment().format('YYYY-MM-DD', withdrawal.created_at),
      amount: withdrawal.amount,
      note: withdrawal.note,
      reject_reason: '',
      accepted: true,
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      reject_reason: event.target.value,
      error: '',
    }, () => {
      const { accepted, reject_reason } = this.state
      this.setState({ enabled: accepted || (!accepted && reject_reason) })
    })
  }

  handleAccept = (event) => {
    this.setState({
      accepted: event.target.value,
      error: '',
    }, () => {
      const { accepted, reject_reason } = this.state
      this.setState({ enabled: accepted || (!accepted && reject_reason) })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const { accepted, reject_reason } = this.state

      this.setState({ enabled: false }, () => {
        accepted ?
          this.props.processWithdrawal(this.id, accepted, {})
          : this.props.processWithdrawal(this.id, accepted, { reject_reason })
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/withdrawals')
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
                <h4 className={classes.cardTitleWhite}>Process Withdrawal Request</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Requester Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Current Balance"
                      id="balance"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.balance
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Request Amount"
                      id="amount"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.amount
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Requested Date"
                      id="requested_date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        type: "date",
                        disabled: true,
                        value: this.state.requested_date
                      }}
                    />
                  </GridItem>
                </Grid>
                {this.state.note &&
                  <Grid container>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText="Note"
                        id="note"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                          value: this.state.note,
                          disabled: true
                        }}
                      />
                    </GridItem>
                  </Grid>
                }
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={this.state.accepted}
                        onChange={this.handleAccept}
                        inputProps={{
                          id: 'accepted',
                        }}
                      >
                        <MenuItem value={true}>Accept</MenuItem>
                        <MenuItem value={false}>Reject</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    {!this.state.accepted &&
                      <CustomInput
                        labelText="Reject Reason"
                        id="reject_reason"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 3,
                          value: this.state.reject_reason,
                          onChange: this.handleChange
                        }}
                      />
                    }
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

export default withStyles(styles)(WithdrawalDetail);
