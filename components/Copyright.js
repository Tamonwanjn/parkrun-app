import React from 'react'
import { Link, Typography,makeStyles, } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({ 
  textfooter: {
    color:'#eeeeee',
    '@media (max-width: 425px)': {
      fontSize: '12px',
    },
    '@media (max-width: 320px)': {
      fontSize: '10px',
    },
  },
}))

const Copyright = () => {
  const classes = useStyles()
  return (
    <Typography variant="body2" align="center" className={classes.textfooter}>
      {'ระบบนี้เป็นของนักวิ่งทุกคน'}
      {'ดูแลโดยมูลนิธิสมาพันธ์ชมรมเดินวิ่งเพื่อสุขภาพไทย'}<br />
      <Link color="inherit" href="https://www.thai.run/">
        Powered by Thaidotrun Co. Ltd
      </Link>
    </Typography>
  )
}

export default Copyright
