import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, makeStyles, Fab, Link } from "@material-ui/core";

import Copyright from "./Copyright";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: "auto",
    width: "100%",
    backgroundColor: "#213e3b",
  },
  imagelogo: {
    margin: theme.spacing(1),
    height: "100px",
  },
  il: {
    margin: theme.spacing(1),
    color: "#fff",
    "@media (max-width: 425px)": {
      fontSize: "16px",
    },
    "@media (max-width: 375px)": {
      fontSize: "14px",
    },
    "@media (max-width: 320px)": {
      fontSize: "12px",
    },
  },
  textfooter: {
    color: "#eeeeee",
    "@media (max-width: 425px)": {
      fontSize: "12px",
    },
    "@media (max-width: 320px)": {
      fontSize: "10px",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const AppFooter = (props) => {
  const classes = useStyles();
  const { description } = props;
  const history = useHistory();

  const handlePolicy = () => {
    history.push("/privacy-policy");
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <footer className={classes.footer}>
          <div
            style={{
              height: "10px",
              width: "100%",
              backgroundColor: "#41AEA9",
            }}
          />
          {/* <div style={{ height:'auto', width:'100%',backgroundColor:'#41AEA9'}}>
            <img className={classes.imagelogo} src="https://upload.wikimedia.org/wikipedia/th/0/0b/Seal_of_the_Ministry_of_Tourism_and_Sports_of_Thailand.png" alt="logo" />
            <img className={classes.imagelogo} src="https://www.sat.or.th/wp-content/uploads/2019/02/logosat1.png" alt="logo" />
            <img className={classes.imagelogo} src="https://upload.wikimedia.org/wikipedia/th/0/0b/Seal_of_the_Ministry_of_Tourism_and_Sports_of_Thailand.png" alt="logo" />
          </div> */}
          <Typography variant="subtitle1" align="center" className={classes.il}>
            มูลนิธิสมาพันธ์ชมรมเดินวิ่งเพื่อสุขภาพไทย {description}
          </Typography>

          <Copyright />
          <Typography
            variant="body2"
            align="center"
            className={classes.textfooter}
            onClick={handlePolicy}
          >
            <Link color="inherit">Private Policy </Link>
          </Typography>
          <div align="center">
            <Fab
              color="primary"
              size="medium"
              aria-label="Facebook.com"
              className={classes.margin}
              onClick={() =>
                window.open("https://www.facebook.com/parkrunthailand")
              }
            >
              <FacebookIcon />
            </Fab>
            <Fab
              color="primary"
              size="medium"
              aria-label="YouTube.com"
              className={classes.margin}
              onClick={() =>
                window.open(
                  "https://www.youtube.com/channel/UCQBZpCdeaOHn_TesYw89gBQ/videos"
                )
              }
            >
              <YouTubeIcon />
            </Fab>
          </div>
        </footer>
      </Grid>
    </Grid>
  );
};

AppFooter.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AppFooter;
