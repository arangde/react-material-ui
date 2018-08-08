/*eslint-disable*/
import React from "react";
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import { logout, checkedAnnouncement, getProfile } from 'redux/actions';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import { Person, Star, AttachMoney, DateRange, Notifications } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...headerLinksStyle(theme),
  messageClose: {
    width: "24px",
    height: "24px",
    '& svg': {
      width: "11px",
      height: "11px",
    }
  },
  readmessage: {
    width: "300px",
    padding: 10,
    display: "flex",
    alignItems: "center",
    '&:hover': {
      padding: 10,
      display: "flex",
    },
    '& > span': {
      width: "calc(100% - 24px)",
    }
  }
})

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      points: '',
      incomes: '',
      nextDate: '',
      announcements: [],
    }
  }

  handleLogout = () => {
    this.props.logout();
    this.props.push('/login');
  }

  componentWillReceiveProps(nextProps) {
    const { member } = nextProps
    this.setState(
      {
        email: member.name,
        points: member.point,
        incomes: member.balance,
        nextDate: moment(member.next_period_date).format('MM/DD/YYYY'),
        announcements: member.announcements,
      }
    )
  }

  readNotification = (id) => {
    this.props.checkedAnnouncement(id)
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink}>
            <Star className={classes.icons} /> {this.state.points}
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink}>
            <AttachMoney className={classes.icons} /> {this.state.incomes}
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink}>
            <DateRange className={classes.icons} /> {this.state.nextDate}
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Notification"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Notifications}
            dropdownList={this.state.announcements.map((announcement, key) => {
              return <a className={classes.dropdownLink + " " + classes.readmessage}>
                <span>{announcement.content}</span>
                <IconButton
                  className={classes.iconButton + " " + classes.messageClose}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.readNotification(announcement.id)}
                >
                  <Close className={classes.close} />
                </IconButton>
              </a>
            })}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={this.state.email}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Person}
            dropdownList={[
              <Link to="/profile" className={classes.dropdownLink}>{getMessage('View Profile')}</Link>,
              <a className={classes.dropdownLink} onClick={this.handleLogout}>{getMessage('Logout')}</a>
            ]}
          />
        </ListItem>
      </List >
    );
  }
}

export default connect((state) => ({
  'member': state.profile.member,
}), { logout, checkedAnnouncement, push })(withStyles(styles)(HeaderLinks))
