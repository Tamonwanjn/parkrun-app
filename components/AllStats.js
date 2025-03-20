import React from 'react'
import {
  makeStyles,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import getStats from '../graphql/queries/getAllStats'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:theme.spacing(2),
    backgroundColor: '#fff'
  },
  md: {
    margin: theme.spacing(1.5),
    alignItems:'flex-end',
    display:"flex",
  },
  texttitle:{
    color:'#272727',
    '@media (max-width: 425px)': {
      fontSize:'14px'
    },
  },
  textbody:{
    marginLeft:theme.spacing(1),
    color: '#666',
    '@media (max-width: 425px)': {
      fontSize:'14px'
    },
  }

}))

const Stats = () => {
  const classes = useStyles()
  const { data = { allEventStats: {} }, loading } = useQuery(getStats, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Grid containe spacing={2}>
      <Grid container item className={classes.root}>
        <Grid item lg={4} md={4} xs={12}>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>สถานที่:</Typography>
            <Typography variant="body1" className={classes.textbody}>{data.allEventStats.eventCount} ที่</Typography>
          </div>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>วิ่งแล้วทั้งหมด:</Typography>
            <Typography variant="body1" className={classes.textbody}>{data.allEventStats.racesCount} ครั้ง</Typography> 
          </div>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>เวลาวิ่งเข้าเส้นชัยโดยเฉลี่ย:</Typography>
            <Typography variant="body1" className={classes.textbody}>{0} ชั่วโมง</Typography>
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>นักวิ่งทั้งหมด:</Typography>
            <Typography variant="body1" className={classes.textbody}>{data.allEventStats.runnerCount} คน</Typography>
          </div>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>อาสาสมัครทั้งหมด:</Typography>
            <Typography variant="body1" className={classes.textbody}>{data.allEventStats.valunteerCount} คน</Typography>
          </div>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>อัตราเฉลี่ยของผู้เข้าร่วม:</Typography>
            <Typography variant="body1" className={classes.textbody}>{0} คน/สนาม</Typography>
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>ผู้เข้าเส้นชัย:</Typography>
            <Typography variant="body1" className={classes.textbody}>{data.allEventStats.checkPointCount} คน</Typography>
          </div>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>PBs:</Typography>
            <Typography variant="body1" className={classes.textbody}>{0} นาที/กิโลเมตร</Typography>
          </div>
          <div className={classes.md}>
            <Typography variant="body1" className={classes.texttitle}>สโมสร:</Typography>
            <Typography variant="body1" className={classes.textbody}>{0} สโมสร</Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Stats
