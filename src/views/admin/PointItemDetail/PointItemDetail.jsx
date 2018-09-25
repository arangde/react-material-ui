import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import * as UploadButton from '@material-ui/core';
import { Image, Cancel } from "@material-ui/icons";
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
  button: {
    '&:hover': {
      backgroundColor: "#fbfbfb",
    }
  },
  input: {
    display: 'none',
  },
  imgContainer: {
    display: "inline-flex",
    justifyContent: "center",
    width: "100%",
  },
  imgWrapper: {
    position: "relative",
    borderRadius: "5px",
    maxWidth: "70%",
    maxHeight: "500px",
    margin: "35px auto 0",
    alignItems: "center",
    '& span': {
      padding: "10px 30px",
    },
    '@media (max-width: 600px)': {
      maxWidth: "90%",
      margin: "15px auto 0",
    },
    '@media (max-width: 412px)': {
      maxWidth: "100%",
      margin: "10px auto 0",
    },
  },
  buttonWrapper: {
    '& svg': {
      fontSize: "40px",
      color: "#9128ac"
    },
    '& > span': {
      border: "1px solid #9a33b2",
    }
  },
  btnCancel: {
    display: "inline-block",
    position: "absolute",
    top: "8px",
    right: "8px",
    height: "24px",
    borderRadius: "30px",
    cursor: "pointer",
    color: "#9128ac",
    '&:hover': {
      boxShadow: "0 0 3px 2px #932aad",
    }
  },
  photoImage: {
    width: "100%",
    maxHeight: "500px",
  }
};

class PointItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      item_name: '',
      item_point: '',
      photo: [],
      photo_url: '',
      note: '',
      enabled: false,
      error: '',
      uploading: false,
    }

    this.replaceImg = this.replaceImg.bind(this)
  }

  cancelImg = (event) => {
    this.setState({ photo_url: '' })
    this.setState({ photo: [] })
    this.setState({ uploading: false })
  }

  replaceImg = (event) => {
    this.setState({
      photo_url: URL.createObjectURL(event.target.files[0])
    })
    this.setState({
      photo: event.target.files[0]
    })
    this.setState({ uploading: true })
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
        this.setState({ error: getMessage(items.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/items')
        }, 3000)
      } else if (items.status === actionTypes.UPDATE_POINTITEM_SUCCESS) {
        this.props.push('/admin/items')
      } else if (items.status === actionTypes.UPDATE_POINTITEM_FAILURE) {
        this.setState({ error: getMessage(items.error), enabled: true })
      }
    }
  }

  fill(item) {
    this.setState({
      item_name: item.item_name,
      item_point: item.item_point,
      photo_url: item.photo_url,
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
      let formData = new FormData();
      formData.append('item_name', this.state.item_name)
      formData.append('item_point', this.state.item_point)
      formData.append('photo', this.state.photo)
      formData.append('note', this.state.note)

      this.setState({ enabled: false }, () => {
        this.props.updatePointItem(this.id, formData)
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
                  <GridItem xs={12} sm={12} md={12}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="outlined-button-file"
                      type="file"
                      onChange={this.replaceImg}
                    />
                    <div className={classes.imgContainer}>
                      <div className={classes.imgWrapper}>
                        {this.state.photo_url !== '' || this.state.uploading ? <div className={classes.btnCancel} onClick={this.cancelImg}><Cancel className={classes.icons} /></div> : null}
                        {this.state.photo_url !== '' ? <img src={this.state.photo_url} className={classes.photoImage} alt="point-detail" /> : null}
                        {this.state.uploading !== true && this.state.photo_url === '' ? (
                          <label htmlFor="outlined-button-file" className={classes.buttonWrapper}>
                            <UploadButton.Button variant="outlined" component="span" className={classes.button}>
                              <Image className={classes.icons} />
                            </UploadButton.Button>
                          </label>
                        ) : null}
                      </div>
                    </div>
                  </GridItem>
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
