import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Person, CreditCard, Phone } from "@material-ui/icons";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    '& button[class*="MuiTab-selected-"]': {
      color: '#9c27b0',
      fontWeight: "600",
    },
    '& span[class*="TabIndicator-colorPrimary-"]': {
      backgroundColor: '#9c27b0'
    }
  }
}

class LandingPage extends React.Component {

  state = {
    value: 'one',
  }

  componentWillMount() {
    this.props.getProfile();
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes, profile } = this.props
    const { value } = this.state

    return (
      <div>
        <Header
          color="transparent"
          brand={getMessage('Home')}
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
