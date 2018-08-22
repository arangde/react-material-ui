import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Person, CreditCard, Phone } from "@material-ui/icons";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from "@material-ui/core/Hidden";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import IncomesSection from "./Sections/IncomesSection.jsx";
import PointsSection from "./Sections/PointsSection.jsx";
// import SalesSection from "./Sections/SalesSection.jsx";
import RefersSection from "./Sections/RefersSection.jsx";
import WithdrawalsSection from "./Sections/WithdrawalsSection.jsx";
import RequestSection from "./Sections/RequestSection.jsx";
// import PointRedeemsSection from "./Sections/PointRedeemsSection.jsx";
import PointSalesSection from "./Sections/PointSalesSection.jsx";
import { getMessage } from 'utils/helpers';

const styles = {
  ...landingPageStyle,
  tabs: {
    textAlign: 'center',
    '& > div': {
      display: 'inline-flex',
    },
    '& button[aria-selected="true"]': {
      color: '#9c27b0',
      fontWeight: "600",
    },
    '& div + span': {
      backgroundColor: '#9c27b0'
    }
  },
  tabBtn: {
    textAlign: 'right',
    '& button': {
      backgroundColor: "#fff",
      color: "#aaa",
      '&:focus, &:hover': {
        color: "#aaa",
      }
    },
  },
  dropdownTabItem: {

  },
  caret: {
    width: 0,
    height: 0,
    display: "inline-block",
    transition: "all 150ms ease-in",
    borderTop: "5px solid",
    marginLeft: "4px",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    verticalAlign: "middle",
  }
}

const tabItem = {
  'one': getMessage('Incomes History'),
  'two': getMessage('Points History'),
  'three': getMessage('Recommends'),
  'four': getMessage('Withdrawals'),
  'five': getMessage('Point Sales')
}

class LandingPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      value: 'one',
      tabText: '',
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  componentWillMount() {
    this.props.getProfile();
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleItem = (value) => {
    this.setState({ value: value })
    this.setState({ tabText: tabItem[value] })
    this.handleClose()
  }

  render() {
    const { classes, profile } = this.props
    const { value, anchorEl, tabText } = this.state

    const tabs = (
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value="one" label={getMessage('Incomes History')} />
        <Tab value="two" label={getMessage('Points History')} />
        <Tab value="three" label={getMessage('Recommends')} />
        <Tab value="four" label={getMessage('Withdrawals')} />
        <Tab value="five" label={getMessage('Point Sales')} />
      </Tabs>
    );

    return (
      <div>
        <Header
          color="transparent"
          brand={getMessage('Membership')}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Parallax small filter image={require("assets/img/bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              {profile.member &&
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>{profile.member.name}</h1>
                  <h4><Person className={classes.icon} />{profile.member.username}</h4>
                  <div className={classes.flex}>
                    <span><Phone className={classes.iconSmall} />{profile.member.phone_number}</span>
                    <span><CreditCard className={classes.iconSmall} />{profile.member.card_number}</span>
                  </div>
                  <br />
                  <Button
                    color="danger"
                    href="/profile"
                    rel="view profile"
                  >
                    {getMessage('Update Profile')}
                  </Button>
                </GridItem>
              }
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Hidden xsDown implementation="css">
              {tabs}
            </Hidden>
            <Hidden smUp>
              <div className={classes.tabBtn}>
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  simple
                >
                  {tabText !== '' ? tabText : getMessage('Tabs')}
                  <b className={classes.caret} />
                </Button>
              </div>
            </Hidden>
            <Hidden smUp implementation="css">
              <div className={classes.dropdownTabItem}>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleItem('one')}>{getMessage('Incomes History')}</MenuItem>
                  <MenuItem onClick={() => this.handleItem('two')}>{getMessage('Points History')}</MenuItem>
                  <MenuItem onClick={() => this.handleItem('three')}>{getMessage('Recommends')}</MenuItem>
                  <MenuItem onClick={() => this.handleItem('four')}>{getMessage('Withdrawals')}</MenuItem>
                  <MenuItem onClick={() => this.handleItem('five')}>{getMessage('Point Sales')}</MenuItem>
                </Menu>
              </div>
            </Hidden>
            {value === 'one' && <IncomesSection incomes={profile.incomes} />}
            {value === 'two' && <PointsSection points={profile.points} />}
            {value === 'three' && <RefersSection referers={profile.referers} />}
            {value === 'four' &&
              <div>
                <WithdrawalsSection withdrawals={profile.withdrawals} />
                <RequestSection section="withdrawals" title="Request New Withdrawal" />
              </div>}
            {value === 'five' &&
              <div>
                <PointSalesSection pointSales={profile.pointSales} />
                <RequestSection section="newpointsale" title="Create Point Sale Request" />
              </div>}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
