/*eslint-disable*/
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import { logout } from 'redux/actions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Person, Star, AttachMoney } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes, member } = props;

  const email = member ? member.name : '';
  const points = member ? member.point : '';
  const incomes = member ? member.balance : '';

  const handleLogout = () => {
    props.logout();
    props.push('/login');
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink}>
          <Star className={classes.icons} /> {points}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink}>
          <AttachMoney className={classes.icons} /> {incomes}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={email}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Person}
          dropdownList={[
            <Link to="/profile" className={classes.dropdownLink}>View Profile</Link>,
            <a className={classes.dropdownLink} onClick={handleLogout}>Logout</a>
          ]}
        />
      </ListItem>
    </List>
  );
}

export default connect((state) => ({
  'member': state.profile.member,
}), { logout, push })(withStyles(headerLinksStyle)(HeaderLinks))
