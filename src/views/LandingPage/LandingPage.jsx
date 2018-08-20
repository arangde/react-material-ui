import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Person, CreditCard, Phone } from "@material-ui/icons";

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

class LandingPage extends React.Component {
  componentWillMount() {
    this.props.getProfile();
  }

  render() {
    const { classes, profile } = this.props

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
        <Parallax small filter>
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
            <IncomesSection incomes={profile.incomes} />
            <PointsSection points={profile.points} />
            <RefersSection referers={profile.referers} />
            <WithdrawalsSection withdrawals={profile.withdrawals} />
            <RequestSection section="withdrawals" title="Request New Withdrawal" />
            <PointSalesSection pointSales={profile.pointSales} />
            <RequestSection section="newpointsale" title="Create Point Sale Request" />
            {/* <PointRedeemsSection redeems={profile.redeems} /> */}
            {/* <RequestSection section="redeems" title="Request Point Redeem" /> */}

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
