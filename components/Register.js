/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
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
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import { notification } from 'antd'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import AuthContext from '../context/AuthContext'

import logo from './img/logo.png'



const useStyles = makeStyles(() => ({
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
    marginLeft: '5px',
    color: '#213e3b',
    '&:hover': {
      color: '#fff'
    },
  },
}))

function Register(props) {
  const { history } = props
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [idcard, setIdcard] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorName, setErrorName] = useState(false)
  const [values, setValues] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [emergenPhone, setEmergenPhone] = useState('')
  const [drug, setDrug] = useState('')
  const [gender, setGender] = useState('male')
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [locale, setLocale] = useState('TH')
  const { register } = useContext(AuthContext)

  const Gender = [
    {
      value: 'male',
      label: {
        TH: "ชาย",
        EN: "Male"
      }[locale],
    },
    {
      value: 'female',
      label: {
        TH: "หญิง",
        EN: "Female"
      }[locale],
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (password !== password2) {
        setLoading(false)
        notification.error({
          message: 'รหัสผ่านไม่ถูกต้อง',
          duration: 5,
          placement: 'bottomRight',
        })
      } else if (errorName === true) {
        setLoading(false)
        notification.error({
          message: `โปรดกรอก ชื่อ-นาสกุล ให้ถูกต้อง`,
          duration: 5,
          placement: 'bottomRight',
        })
      } else if (error === true) {
        setLoading(false)
        notification.error({
          message: `เลขประจำตัวประชาชนไม่ถูกต้อง`,
          duration: 5,
          placement: 'bottomRight',
        })
      } else {
        const data = await register({
          email, password, name, idcard, phone, emergenPhone, drug, gender, birthDate: new Date(birthDate),
        })
        if (data) {
          setLoading(false)
          notification.success({
            message: 'ลงทะเบียนเสร็จสิ้น',
            duration: 5,
            placement: 'bottomRight',
          })
          history.push('/home')
        } else {
          setLoading(false)
          console.log('err')
        }
      }
    } catch (err) {
      setLoading(false)
      notification.error({
        message: `${err}`,
        duration: 5,
        placement: 'bottomRight',
      })
    }
  }
  const checkId = (e) => {
    const id = e.target.value
    setIdcard(id)
    // console.log(id)
    const pattern = /^[0-9]*$/
    // console.log('ex:' +pattern.test(id))
    if (locale === 'EN') {
      setError(false)
      return true
    }
    if (pattern.test(id)) {
      if (id.length !== 13) {
        setError(true)
        return false
      }
      let sum = 0
      for (let i = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i)
      if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
        setError(true)
      } else {
        setError(false)
      }
    } else {
      setError(false)
    }
  }
  console.log(error)

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLocale = (e, c) => {
    e.preventDefault();
    if (c) {
      setLocale('EN')
    } else {
      setLocale('TH')
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setName(value);
    setErrorName(value.trim() === ''); // Check if the trimmed value is empty
  };

  return (
    <React.Fragment>
      <Grid className="forms-container">
        <Grid className="signin-signup">
          <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
            <Typography variant="h3" className="title">
              {({
                TH: "ลงทะเบียน",
                EN: "Register"
              })[locale]}
            </Typography>
            <div className="input-field">
              <i className="fas fa-user" />
              <TextField
                className="input-textField"
                // id="input-with-icon-grid"
                label={({
                  TH: "ชื่อ นามสกุล",
                  EN: "User Name"
                })[locale]}
                type="userName"
                placeholder={({
                  TH: "ชื่อ นามสกุล",
                  EN: "User Name"
                })[locale]}
                onChange={handleInputChange}
                InputLabelProps={{
                  style: { color: '#52575d' }
                }}
                InputProps={{ classes }}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-address-card" />
              <TextField
                className="input-textField"
                // id="input-with-icon-grid"
                label={({
                  TH: "เลขประจำตัวบัตรประชาชน",
                  EN: "Passport Number"
                })[locale]}
                type="idcard"
                placeholder={({
                  TH: "เลขประจำตัวบัตรประชาชน",
                  EN: "Passport Number"
                })[locale]}
                onChange={(e) => checkId(e)}
                InputLabelProps={{
                  style: { color: '#52575d', marginTop: '-3px' },
                }}
                InputProps={{ classes }}
                required
              />
            </div>
            <div className="input-field">
              <i class="fas fa-birthday-cake" />
              <TextField
                className="input-textField"
                id="date"
                label={({
                  TH: "วันเกิด",
                  EN: "Birthday"
                })[locale]}
                type="date"
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#52575d' },
                }}
                InputProps={{ classes }}
                required
              />
            </div>
            <div className="input-field">
              <i class="fas fa-venus-mars" />
              <TextField
                fullWidth
                label={({
                  TH: "เพศ",
                  EN: "Gender"
                })[locale]}
                name="Gender"
                required
                select
                SelectProps={{ native: true }}
                onChange={(e) => setGender(e.target.value)}
                InputProps={{ classes }}
              >
                {Gender.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>

            <div className="input-field">
              <i className="fas fa-phone-alt" />
              <TextField
                className="input-textField"
                required
                label={({
                  TH: "เบอร์มือถือ",
                  EN: "Phone Number"
                })[locale]}
                type="phone"
                placeholder={({
                  TH: "เบอร์มือถือ",
                  EN: "Phone Number"
                })[locale]}
                onChange={(e) => setPhone(e.target.value)}
                InputLabelProps={{
                  style: { color: '#52575d', marginTop: '-3px' },
                }}
                InputProps={{ classes }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone-alt" />
              <TextField
                className="input-textField"
                required
                label={({
                  TH: "เบอร์โทรฉุกเฉิน",
                  EN: "Emergencyphone Number"
                })[locale]}
                type="emergency"
                placeholder={({
                  TH: "เบอร์โทรฉุกเฉิน",
                  EN: "Emergencyphone Number"
                })[locale]}
                onChange={(e) => setEmergenPhone(e.target.value)}
                InputLabelProps={{
                  style: { color: '#52575d', marginTop: '-3px' },
                }}
                InputProps={{ classes }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-at" />
              <TextField
                className="input-textField"
                required
                label={({
                  TH: "อีเมล",
                  EN: "Email Address"
                })[locale]}
                type="email"
                placeholder={({
                  TH: "อีเมล",
                  EN: "Email Address"
                })[locale]}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: '#52575d', marginTop: '-3px' },
                }}
                InputProps={{ classes }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-pills" />
              <TextField
                className="input-textField"
                required
                label={({
                  TH: "ประวัติการแพ้ยา",
                  EN: "A history of drug allergy"
                })[locale]}
                placeholderl={({
                  TH: "ประวัติการแพ้ยา",
                  EN: "A history of drug allergy"
                })[locale]}
                onChange={(e) => setDrug(e.target.value)}
                InputLabelProps={{
                  style: { color: '#52575d', marginTop: '-3px' },
                }}
                InputProps={{ classes }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <FormControl className="input-textField" >
                <InputLabel
                  style={{ color: '#52575d', lineHeight: '0.5' }}
                  htmlFor="outlined-adornment-password"
                  required
                >
                  {({
                    TH: "รหัสผ่าน",
                    EN: "Password"
                  })[locale]}
                </InputLabel>
                <Input
                  id="password"
                  placeholder={({
                    TH: "รหัสผ่าน",
                    EN: "Password"
                  })[locale]}
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end" style={{ marginRight: '10px' }}>
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
            <div className="input-field">
              <i className="fas fa-lock" />
              <TextField
                className="input-textField"
                required
                label={({
                  TH: "ยืนยันรหัสผ่าน",
                  EN: "Confirm Password"
                })[locale]}
                type="password"
                placeholder={({
                  TH: "ยืนยันรหัสผ่าน",
                  EN: "Confirm Password"
                })[locale]}
                onChange={(e) => setPassword2(e.target.value)}
                // autoComplete="current-password"
                InputLabelProps={{
                  style: { color: '#52575d', marginTop: '-3px' },
                }}
                InputProps={{ classes }}
              />
            </div>
            <Button className="btn" type="submit" value="Sign up" disabled={loading} loading={loading} loadingPosition="start">
              {({
                TH: "ลงทะเบียน",
                EN: "Sign up now"
              })[locale]}
            </Button>
            <FormControlLabel
              value="end"
              control={
                <Switch color="primary"
                  onChange={(e, c) => handleLocale(e, c)}
                />}
              label="Register for foreigners"
              labelPlacement="end"
            >
            </FormControlLabel>
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
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <img className="imagelogo" src={logo} alt="logo" />
            <Typography variant="h3" className="text3">Park Run THAILAND</Typography>
            <Typography variant="subtitle1" className="textboby">
              Free for everyone forever
            </Typography>
            <Typography variant="subtitle1" className="textboby">
              Have an account ?
              {' '}
              <NavLink
                className={classes.nav}
                to="/actions/login"
                variant="h1"
              >
                {({
                  TH: "เข้าสู่ระบบ",
                  EN: "Sign in"
                })[locale]}
              </NavLink>
            </Typography>
            {/* <Button className="btn-transparent" id="sign-in-btn">
              <NavLink to="/actions/login2" style={{ color: '#fff' }}>
                เข้าสู่ระบบ
              </NavLink>
            </Button> */}
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape(),
}
Register.defaultProps = {
  history: {},
}

// const Copyright = () => (
//   <Typography variant="body2" color="textSecondary" align="center">
//     {'Copyright © '}
//     {new Date().getFullYear()}{' '}
//     <Link color="inherit" href="https://material-ui.com/">
//       Thaidotrun Co. Ltd.
//     </Link>
//   </Typography>
// )

export default withRouter(Register)
