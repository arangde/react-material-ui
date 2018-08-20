import React from "react";
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
import Alert from "components/Alert/Alert.jsx";

import checkboxAndRadioStyle from "assets/jss/material-dashboard-react/checkboxAndRadioStyle.jsx";
import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";

import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';

const styles = {
  ...checkboxAndRadioStyle,
  ...cardStyle,
};

class PointItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      item_name: '',
      item_point: '',
      note: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getPointItem(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps

    if (items.status !== this.props.items.status) {
      if (items.status === actionTypes.GET_POINTITEM_SUCCESS) {
        this.fill(items.item)
      } else if (items.status === actionTypes.GET_POINTITEM_FAILURE) {
        this.setState({ error: items.error, enabled: true })
        setTimeout(() => {
          this.props.push('/admin/items')
        }, 3000)
      } else if (items.status === actionTypes.UPDATE_POINTITEM_SUCCESS) {
        this.props.push('/admin/items')
      } else if (items.status === actionTypes.UPDATE_POINTITEM_FAILURE) {
        this.setState({ error: items.error, enabled: true })
      }
    }
  }

  fill(item) {
    this.setState({
      item_name: item.item_name,
      item_point: item.item_point,
      note: item.note,
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    }, () => {
      const { item_name, item_point } = this.state
      this.setState({ enabled: item_name && item_point })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const item = {
        id: this.id,
        item_name: this.state.item_name,
        item_point: this.state.item_point,
        note: this.state.note,
      }

      this.setState({ enabled: false }, () => {
        this.props.updatePointItem(item)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/items')
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
                <h4 className={classes.cardTitleWhite}>{getMessage('Point item Details')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Edit item's info")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Name')}
                      error={!this.state.item_name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.item_name,
                        name: "item_name",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Point')}
                      error={!this.state.item_point}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.item_point,
                        name: "item_point",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={getMessage('Note')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 2,
                        onChange: this.handleChange,
                        value: this.state.note,
                        name: "note",
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Save')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PointItemDetail);
