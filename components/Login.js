import React, { useContext, useState } from 'react'
import { useHistory, withRouter, NavLink } from 'react-router-dom'
import { notification } from 'antd'
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Input,
} from '@material-ui/core'

import logo from './img/logo.png'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import AuthContext from '../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  nav: {
    fontSize: 20,
    fontWeight: 600,
    marginLeft:'5px',
    color: '#213e3b',
    '&:hover': {
      color: '#fff'
    },
  },
  reset: {
    fontSize: 14,
    color: '#000',
    '&:hover': {
      color: '#16a596'
    },
  },
}))

const  Login = () => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [values, setValues] = useState('')
  const { signIn } = useContext(AuthContext)
  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userInfo = await signIn({ email, password })
      //console.log(userInfo)
      if (userInfo.userId) {
          notification.success({
          message: `ล็อคอินสำเร็จ`,
          duration: 5,
          placement: 'bottomRight'
        })
        if(history.location.state && history.location.state.from){
          history.push(history.location.state.from.pathname)
        }else{
          history.push('/home')
        }
        return
      }
    } catch (error) {
      console.log(error)
      const errorCode = error.code
      // const errorMessage = error.message
      if (errorCode === 'auth/user-not-found') {
        notification.error({
          message: `ไม่มีอีเมลนี้ในระบบ`,
          duration: 5,
          placement: 'bottomRight'
        })
      } else if (errorCode === 'auth/wrong-password') {
        notification.error({
          message: `รหัสผ่านไม่ถูกต้อง`,
          duration: 5,
          placement: 'bottomRight'
        })
      } else if (errorCode === 'auth/network-request-failed') {
        notification.error({
          message: `โปรดตรวจสอบอินเตอร์เน็ตของท่าน`,
          duration: 5,
          placement: 'bottomRight'
        })
      } else {
        notification.error({
          message: `${error}`,
          duration: 5, 
          placement: 'bottomRight'
        })
      }
    }
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Grid className="forms-container" onSubmit={(e)=>handleLogin(e)}>
        <Grid className="signin-signup">
          <form action="#" className="sign-in-form">
            <Typography variant="h3" className="title">เข้าสู่ระบบ</Typography>
            <div className="input-field">
              <i className="fas fa-user" />
              <TextField
                className="input-textField"
                label="อีเมล"
                placeholder="อีเมล"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: '#52575d' },
                }}
                InputProps={{ classes }}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <FormControl className="input-textField" >
                <InputLabel 
                style={{color: '#52575d',lineHeight: '0.5' }}
                htmlFor="outlined-adornment-password"
                >
                  รหัสผ่าน
                  </InputLabel>
                <Input
                  id="password"
                  placeholder="รหัสผ่าน"
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end" style={{marginRight:'10px'}}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  InputLabelProps={{
                    style: { color: '#52575d', marginTop: '-3px' },
                  }}
                  InputProps={{ classes }}
                  disableUnderline={true}
                />
              </FormControl>
            </div>
            {/* <div style={{marginRight:'300px'}} >
            <Switch size="small"defaultChecked />
            <Typography variant="subtitle2">จดจำฉัน</Typography>
            </div> */}
            <Button className="btn solid" type="submit" value="Login">เข้าสู่ระบบ</Button>
            <NavLink
              className={classes.reset}
              to="/password/reset"
            >
            ลืมรหัสผ่าน ?
            </NavLink>
          </form>
        </Grid>
      </Grid>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <img className="imagelogo" src={logo} alt="logo" />
            <Typography variant="h3" className="text3">Park Run THAILAND</Typography>
            <Typography variant="subtitle1" className="textboby">
              Free for everyone forever
            </Typography>
            <Typography variant="subtitle1" className="textboby">
              Have not registered ?
              {' '}
            <NavLink
                className={classes.nav}
                to="/actions/register"
                variant="h1"
              >
              ลงทะเบียน
              </NavLink>
              </Typography>
          </div>
          {/* <img src={img} className="image" alt="" /> */}
        </div>
        <div className="panel right-panel">
          <div className="content">
            <img className="imagelogo" src={logo} alt="logo" />
            <Typography variant="h3" className="text3">Park Run THAILAND</Typography>
            <Typography variant="subtitle1" className="textboby">
               Free for everyone forever
            </Typography>
          </div>
          {/* <img src={img2} className="image" alt="" /> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)
