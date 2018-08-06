import React from "react";
import PropTypes from 'prop-types';
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
import { createWithdrawal, createPointRedeem } from 'redux/actions'
import * as actionTypes from 'redux/actionTypes'

const styles = {
  ...workStyle,
  note: {
    '& > div': {
      margin: "auto 0",
    }
  },
  textCenter: {
    ...workStyle.textCenter,
    marginTop: "15px",
  }
};

class RequestSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: '',
      point: '',
      note: '',
      enabled: false,
      error: '',
      success: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps[this.props.section].status !== this.props[this.props.section].status) {
      if (nextProps[this.props.section].status === actionTypes.CREATE_WITHDRAWAL_SUCCESS || nextProps[this.props.section].status === actionTypes.CREATE_POINTREDEEM_SUCCESS) {
        this.setState({ error: '', success: 'Your request has been sent successfully!', enabled: true })
      } else if (nextProps[this.props.section].status === actionTypes.CREATE_WITHDRAWAL_FAILURE || nextProps[this.props.section].status === actionTypes.CREATE_POINTREDEEM_FAILURE) {
        this.setState({ error: nextProps[this.props.section].error, success: '', enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '', success: '',
    }, () => {
      const amount = parseFloat(this.state.amount)
      const point = parseFloat(this.state.point)
      this.setState({ enabled: amount > 0 || point > 0 })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', success: '' })

    if (this.state.enabled) {
      this.setState({ enabled: false }, () => {
        if (this.props.section === 'withdrawals') {
          this.props.createWithdrawal({
            member_id: this.props.member.id,
            amount: parseFloat(this.state.amount),
            note: this.state.note
          })
        } else {
          this.props.createPointRedeem({
            member_id: this.props.member.id,
            point: parseFloat(this.state.point),
            note: this.state.note
          })
        }
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
            <h2 className={classes.title}>Request {this.props.section === 'withdrawals' ? 'New Withdrawal' : 'Point Redeem'}</h2>
            <h4 className={classes.description}>
            </h4>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {this.props.section === 'withdrawals' ? (
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
                  ) : (
                      <CustomInput
                        labelText="Point"
                        id="point"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: this.state.point,
                          onChange: this.handleChange,
                        }}
                      />
                    )}

                </GridItem>
                <GridItem xs={12} sm={12} md={12} className={classes.note}>
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
                </GridItem>
                <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                  <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>Send Request</Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RequestSection.propTypes = {
  section: PropTypes.string.isRequired,
};

export default connect((state) => ({
  'member': state.profile.member,
  'withdrawals': state.withdrawals,
  'redeems': state.redeems,
}), { createWithdrawal, createPointRedeem })(withStyles(styles)(RequestSection));
