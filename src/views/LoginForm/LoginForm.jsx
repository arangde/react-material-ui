import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

const styles = {
  cardTitle: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardFooter: {
    margin: "1rem auto",
  }
};

function LoginForm(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container>
        <GridItem xs={12} sm={2} md={4}></GridItem>
        <GridItem xs={12} sm={8} md={4}>
          <Card>
            <CardHeader color="primary">
              <h2 className={classes.cardTitle}>Login</h2>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password"
                    }}
                  />
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Button color="primary" className={classes.cardFooter}>Login</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(LoginForm);
