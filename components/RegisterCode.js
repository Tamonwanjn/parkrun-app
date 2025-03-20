/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import getUser from '../graphql/queries/getUserSearch'

import logo from './img/logo.png'
// import img2 from './img/register.svg'
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core'
import { notification } from 'antd'

import AuthContext from '../context/AuthContext'

const Gender = [
    {
      value: 'male',
      label: 'ชาย'
    },
    {
      value: 'female',
      label: 'หญิง'
    }
  ];


const useStyles = makeStyles(() => ({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
}))

function RegisterCode(props) {
  const { history } = props
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [idcard, setIdcard] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [emergenPhone, setEmergenPhone] = useState('')
  const [drug, setDrug] = useState('')
  const [error, setError] = useState(false)
  const [code, setCode] = useState('')
  const [User, setUser] = useState({})
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [loading, setLoading] = useState(false)
  const { registerCode } = useContext(AuthContext)

  const userOne = useQuery(getUser, { fetchPolicy: 'network-only', skip: true })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if(password !== password2) {
        setLoading(false)
        notification.error({
          message: `รหัสผ่านไม่ถูกต้อง`,
          duration: 5,
          placement: 'bottomRight'
        })
      } else if(error===true){
        setLoading(false)
         notification.error({
          message: `เลขประจำตัวประชาชนไม่ถูกต้อง`,
          duration: 5,
          placement: 'bottomRight'
        })
      }else{
        const data = await registerCode({
          _id: code, email, password, name, idcard, phone, emergenPhone, drug, gender, birthDate: new Date(birthDate)
        })
        if (data) {
          setLoading(false)
          notification.success({
          message: `ลงทะเบียนเสร็จสิ้น`,
          duration: 5,
          placement: 'bottomRight'
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
          placement: 'bottomRight'
        })
    }
  }
  const checkId = (e) => {
    const id = e.target.value
    setIdcard(id)
    //console.log(id)
    const pattern = /^[0-9]*$/
    //console.log('ex:' +pattern.test(id))
    if(pattern.test(id)){
      if (id.length !== 13) {
        setError(true)
        return false
      }
      let sum = 0
      for (let i = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i)
      if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
        setError(true)
      }else{
        setError(false)
      }
    }else{
      setError(false)
    }
  }
  console.log(error)
  const SearchUser = async () => {
      try{
        const userOneResult = await userOne.refetch({_id: code})
        setUser(userOneResult.data)
        console.log(userOneResult)
      } catch {
        notification.error({
            message: `code  ไม่ถูกต้อง`,
            duration: 5, 
            placement: 'bottomRight'
          })
      }
    

  }
  return (
    <React.Fragment>
      <Grid className="forms-container" >
        <Grid className="signin-signup">
          <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
            <Typography variant="h3" className="title">ลงทะเบียน ด้วย Code</Typography>
            {!User.userOne ? ( <React.Fragment>
                <div className="input-field">
                    <i className="fas fa-user" />
                    <TextField
                    className="input-textField"
                    //id="input-with-icon-grid"
                    label="Code"
                    type="text"
                    placeholder="Code"
                    onChange={(e) => setCode(e.target.value)}
                    InputLabelProps={{
                        style: { color: '#52575d' },
                    }}
                    InputProps={{ classes }}
                    required
                    />
                    
                </div>
                <Button className="btn" onClick={(e)=>SearchUser(e)}> ค้นหา </Button>
                </React.Fragment>
                
            ):(
                <React.Fragment>
                    {User.userOne && <div className="input-field">
                    <i className="fas fa-user" />
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="Code"
                        type="userName"
                        placeholder="Code"
                        value={User.userOne._id}
                        InputLabelProps={{
                        style: { color: '#52575d' },
                        }}
                        InputProps={{ classes }}
                        required
                        disabled
                    />
                    </div>}
                    <div className="input-field">
                    <i className="fas fa-user" />
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="ชื่อ นามสกุล"
                        type="userName"
                        placeholder="ชื่อ นามสกุล"
                        onChange={(e) => setName(e.target.value)}
                        InputLabelProps={{
                        style: { color: '#52575d' },
                        }}
                        InputProps={{ classes }}
                        required
                    />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-address-card" />
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="เลขประจำตัวบัตรประชาชน"
                        type="idcard"
                        placeholder="เลขประจำตัวบัตรประชาชน"
                        onChange={(e) => checkId(e)}
                        InputLabelProps={{
                        style: { color: '#52575d', marginTop: '-3px' },
                        }}
                        InputProps={{ classes }}
                        required
                    />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-address-card" />
                            <TextField
                            className="input-textField"
                            id="date"
                            label="วันเกิด"
                            type="date"
                            //defaultValue="2017-05-24"
                            onChange={(e) => setBirthDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                                style: { color: '#52575d', marginTop: '-3px' },
                            }}
                            InputProps={{ classes }}
                            required
                            />
                        </div>
                        <div className="input-field">
                        <i className="fas fa-address-card" />
                        <TextField
                            fullWidth
                            label="เพศ"
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
                        //id="input-with-icon-grid"
                        label="เบอร์มือถือ"
                        type="phone"
                        placeholder="เบอร์มือถือ"
                        onChange={(e) => setPhone(e.target.value)}
                        InputLabelProps={{
                        style: { color: '#52575d', marginTop: '-3px' },
                        }}
                        InputProps={{ classes }}
                    />
                    </div>
                    <div className="input-field">
                    <i class="fas fa-phone-alt"></i>              
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="เบอร์โทรฉุกเฉิน"
                        type="emergency"
                        placeholder="เบอร์โทรฉุกเฉิน"
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
                        //id="input-with-icon-grid"
                        label="อีเมล"
                        type="email"
                        placeholder="อีเมล"
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{
                        style: { color: '#52575d', marginTop: '-3px' },
                        }}
                        InputProps={{ classes }}
                    />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-pills"></i>
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="ประวัติการแพ้ยา"
                        type="phone"
                        placeholder="ประวัติการแพ้ยา"
                        onChange={(e) => setDrug(e.target.value)}
                        InputLabelProps={{
                        style: { color: '#52575d', marginTop: '-3px' },
                        }}
                        InputProps={{ classes }}
                    />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock" />
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="รหัสผ่าน"
                        type="password"
                        placeholder="รหัสผ่าน"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        InputLabelProps={{
                        style: { color: '#52575d', marginTop: '-3px' },
                        }}
                        InputProps={{ classes }}
                    />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock" />
                    <TextField
                        className="input-textField"
                        //id="input-with-icon-grid"
                        label="ยืนยันรหัสผ่าน"
                        type="password"
                        placeholder="ยืนยันรหัสผ่าน"
                        onChange={(e) => setPassword2(e.target.value)}
                        // autoComplete="current-password"
                        InputLabelProps={{
                        style: { color: '#52575d', marginTop: '-3px' },
                        }}
                        InputProps={{ classes }}
                    />
                    </div>
                    <Button className="btn" type="submit" value="Sign up" disabled={loading}>ลงทะเบียน</Button>
                </React.Fragment>
            )}
            
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
            <Button className="btn-transparent" id="sign-up-btn">
              <NavLink to="/actions/register" style={{ color: '#fff' }}>
                ลงทะเบียน
              </NavLink>
            </Button>
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
            <Button className="btn-transparent" id="sign-in-btn">
              <NavLink to="/actions/login" style={{ color: '#fff' }}>
                เข้าสู่ระบบ
              </NavLink>
            </Button>
          </div>
          {/* <img src={img2} className="image" alt="" /> */}
        </div>
      </div>

      {/* <Box mt={'50%'}>
        <Copyright />
      </Box> */}
    </React.Fragment>
  )
}
RegisterCode.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape(),
}
RegisterCode.defaultProps = {
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

export default withRouter(RegisterCode)
