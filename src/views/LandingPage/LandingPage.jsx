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
import imgBg from "assets/img/bg.jpg";
import imgBgRecommends from "assets/img/bg_recommends.jpg";
import imgBgPointSales from "assets/img/bg_point_sales.jpg";
import imgBgPoints from "assets/img/bg_points.jpg";
import imgBgWithdrawals from "assets/img/bg_withdrawals.jpg";
import imgTabRecommends from "assets/img/tab_recommends.jpg";
import imgTabPointSales from "assets/img/tab_point_sales.jpg";
import imgTabPoints from "assets/img/tab_points.jpg";
import imgTabWithdrawals from "assets/img/tab_withdrawals.jpg";
import imgTabIncomes from "assets/img/tab_incomes.jpg";

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

  backgrounds = [imgBg, imgBgPoints, imgBgRecommends, imgBgWithdrawals, imgBgPointSales];

  state = {
    tabIndex: 0,
  }

  componentWillMount() {
    this.props.getProfile();
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value })
  }

  render() {
    const { classes, profile } = this.props
    const { tabIndex } = this.state
    const bg = this.backgrounds[tabIndex];

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
        <Parallax small filter image={bg}>
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
          <div className={classNames(classes.container, classes.content)}>
            <Tabs
              className={classes.tabs}
              value={tabIndex}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab value={0} label={getMessage('Incomes History')} />
              <Tab value={1} label={getMessage('Points History')} />
              <Tab value={2} label={getMessage('Recommends')} />
              <Tab value={3} label={getMessage('Withdrawals')} />
              <Tab value={4} label={getMessage('Point Sales')} />
            </Tabs>

            {tabIndex === 0 && <IncomesSection incomes={profile.incomes} />}
            {tabIndex === 1 && <PointsSection points={profile.points} />}
            {tabIndex === 2 && <RefersSection referers={profile.referers} />}
            {tabIndex === 3 &&
              <div>
                <WithdrawalsSection withdrawals={profile.withdrawals} />
                <RequestSection section="withdrawals" title="Request New Withdrawal" />
              </div>}
            {tabIndex === 4 &&
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
