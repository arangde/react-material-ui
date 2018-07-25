import React from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Alert from "components/Alert/Alert.jsx";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import { createWithdrawal } from 'redux/actions'
import * as actionTypes from 'redux/actionTypes'

class RequestSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: '',
      note: '',
      enabled: false,
      error: '',
      success: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { withdrawals } = nextProps;

    if (withdrawals.status !== this.props.withdrawals.status) {
      if (withdrawals.status === actionTypes.CREATE_WITHDRAWAL_SUCCESS) {
        this.setState({ error: '', success: 'Your request has been sent successfully!', enabled: true })
      } else if (withdrawals.status === actionTypes.CREATE_WITHDRAWAL_FAILURE) {
        this.setState({ error: withdrawals.error, success: '', enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '', success: '',
    }, () => {
      const amount = parseFloat(this.state.amount)
      this.setState({ enabled: amount > 0 })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', success: '' })

    if (this.state.enabled) {
      this.setState({ enabled: false }, () => {
        this.props.createWithdrawal({
          member_id: this.props.member.id,
          amount: parseFloat(this.state.amount),
          note: this.state.note
        })
      })
    }

    return false
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <Alert color="success" message={this.state.success} />
        <Alert message={this.state.error} />
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Request New Withdrawal</h2>
            <h4 className={classes.description}>
              Divide details about your product or agency work into parts. Write
              a few lines about each one and contact us about any further
              collaboration. We will responde get back to you in a couple of
              hours.
            </h4>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Withdrawal Amount"
                    id="amount"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.amount,
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <CustomInput
                  labelText="Note"
                  id="note"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 4,
                    value: this.state.note,
                    onChange: this.handleChange,
                  }}
                />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                    <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>Send Request</Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default connect((state) => ({
  'member': state.profile.member,
  'withdrawals': state.withdrawals,
}), { createWithdrawal })(withStyles(workStyle)(RequestSection));
