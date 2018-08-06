import { container, title } from "assets/jss/material-kit-react.jsx";

const landingPageStyle = {
  container: {
    ...container,
    zIndex: "12",
    color: "#FFFFFF",
    "@media (min-width: 576px)": {
      maxWidth: "initial"
    },
    "@media (min-width: 768px)": {
      maxWidth: "initial"
    },
  },
  title: {
    ...title,
    fontSize: "2.875rem",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  flex: {
    flex: 1,
    '& span': {
      paddingRight: '10px'
    }
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "4px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  iconSmall: {
    width: "16px",
    height: "16px",
    marginRight: "3px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 767px)": {
      margin: "-60px 10px 0px",
    },
  }
};

export default landingPageStyle;
