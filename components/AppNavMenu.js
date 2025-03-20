// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-return-assign */
// import React, { Fragment, Component } from 'react'
// import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'
// import {
//   Link,
//   IconButton,
//   Typography,
//   Button,
//   Dialog,
//   Container,
//   Toolbar,
// } from '@material-ui/core'
// import { Row, Col } from 'antd'
// import DehazeIcon from '@material-ui/icons/Dehaze'
// import ClearIcon from '@material-ui/icons/Clear'

// import Logo from '../images/parkrunlogo.jpg'
// // import logo from '../images/logo.png'
// import AuthContext from '../context/AuthContext'
// // import EventByOrganiz from '../pages/EventByOrganiz'

// import { HeaderContainer, Navber } from './styledComponents'
// import './Nav.css'

// class AppNavMenu extends Component {
//   // eslint-disable-next-line react/static-property-placement
//   static contextType = AuthContext
//   constructor(props) {
//     super(props)
//     this.state = {
//       modal: false,
//     }
//   }
//   componentDidMount() {
//     this.interval = setInterval(() => {
//       const navbar = this.navstk
//       const sticky = navbar && navbar.offsetTop
//       if (window.pageYOffset > sticky) {
//         navbar && navbar.classList.add('sticky')
//       } else {
//         navbar && navbar.classList.remove('sticky')
//       }
//     }, 1000)
//   }
//   render() {
//     const { userInfo, signOut } = this.context
//     const { location } = this.props
//     console.log(location)
//     return (
//       <div className="navbar-header" ref={(stk) => this.navstk = stk} >
//         <Container>
//           <Toolbar>
//             <HeaderContainer >
//               <Row justify="space-between">
//                 <Col xs={8} lg={1} style={{ display: 'flex', alignItems: 'center' }}>
//                   {location.pathname !== '/home' && location.pathname !== '/' &&
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                       <img alt="Logo" src={Logo}  style={{height:'50px' , width:'50px'}}/>
//                     </IconButton>
//                   }
                  
//                   {/* <Typography variant="h6" className="navTitle">
//                     {title}
//                   </Typography> */}
//                 </Col>
//                 <Col
//                   xs={0}
//                   lg={8}
//                   style={{
//                     justifyContent: 'flex-start', display: 'flex', alignItems: 'center', marginLeft: '-150px',
//                   }}
//                   className="navbarnone"
//                 >
//                   <Typography component="div" className="grow">
//                     <Button color="primary"><Link href="/home" color="inherit" underline="none" style={{fontSize:20}} >หน้าหลัก</Link></Button>
//                     <Button color="primary"><Link href="/event" color="inherit" underline="none" style={{fontSize:20}} >ผลการวิ่ง</Link></Button>
//                     <Button color="primary"><Link href="/profile" color="inherit" underline="none" style={{fontSize:20}} >โปรไฟล์</Link></Button>
//                   </Typography>
//                 </Col>
//                 <Col
//                   xs={0}
//                   lg={8}
//                   style={{
//                     justifyContent: 'flex-end', display: 'flex', alignItems: 'center', marginLeft: '100px',
//                   }}
//                   className="navbarnone"
//                 >
//                   {!userInfo && (
//                   <>
//                     <Button color="inherit"><Link href="/login" color="inherit" underline="none">เข้าสู่ระบบ</Link></Button>
//                     <Button variant="contained"><Link href="/register" color="inherit" underline="none">สมัครสมาชิก</Link></Button>
//                   </>
//                   )}
//                   {userInfo && (
//                   <>
//                     <p>{userInfo.email}</p>
//                     <Button variant="contained" color="inherit"><Link href="/login" color="inherit" underline="none" onClick={signOut}>ออกจากระบบ</Link></Button>
//                   </>
//                   )}
//                 </Col>
//                 <Col xs={6} lg={0} style={{ textAlign: 'right' }}>
//                   <Navber>
//                     {/* <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}> */}
//                     <Button href="#" onClick={() => this.setState({ modal: true })}>
//                       <IconButton size="small">
//                         <DehazeIcon alt="menuicon" height="30px" style={{ marginRight: '10px' }} />
//                       </IconButton>
//                     </Button>
//                     {/* </Dropdown> */}
//                   </Navber>
//                 </Col>
//               </Row>
//             </HeaderContainer>
//           </Toolbar>
//         </Container>
//         <Dialog fullWidth maxWidth="xl" open={this.state.modal} onClose={() => this.setState({ modal: false })}>
//           <Row type="flex" justify="space-between" style={{ marginTop: '30px' }}>
//             <Col>
//               <img style={{ height: '50px', marginLeft: '20px' }} src={Logo} alt="logo" />
//               <Typography variant="h6" style={{ marginLeft: '90px', marginTop: '-40px' }}>ParkrunThailand</Typography>
//             </Col>
//             <Col>
//               <Button href="#" onClick={() => { this.setState({ modal: false }) }}>
//                 <ClearIcon style={{ height: '40px', marginRight: '10px', color: '#707070' }} />
//               </Button>
//             </Col>
//           </Row>
//           <Row style={{ marginBottom: '11vh' }} type="flex" justify="center">
//             <Col xs={24} style={{ textAlign: 'center', fontSize: '17px' }}>
//               <Fragment>
//                 <p style={{ marginTop: '10px' }} />
//                 <Button color="inherit"><Link href="/home" color="inherit" underline="none">หน้าหลัก</Link></Button>
//                 <p style={{ marginTop: '10px' }} />
//                 <Button color="inherit"><Link href="/event" color="inherit" underline="none">งานวิ่ง</Link></Button>
//                 <p style={{ marginTop: '10px' }} />
//                 <Button color="inherit"><Link href="/profile" color="inherit" underline="none">โปรไฟล์</Link></Button>
//                 <p style={{ marginTop: '10px' }} />
//                 <Button color="inherit"><Link href="/manage-event" color="inherit" underline="none">สร้างงานวิ่ง</Link></Button>
//                 {userInfo && (
//                 <>
//                   <p>{userInfo.email}</p>
//                   <Button variant="contained" color="inherit"><Link href="/login" color="inherit" underline="none" onClick={signOut}>ออกจากระบบ</Link></Button>
//                 </>
//                 )}
//                 {!userInfo && (
//                 <>
//                   <p style={{ marginTop: '10px' }} />
//                   <Button color="inherit"><Link href="/login" color="inherit" underline="none">เข้าสู่ระบบ</Link></Button>
//                   <p style={{ marginTop: '10px' }} />
//                   <Button variant="contained"><Link href="/signUp" color="inherit" underline="none">สมัครสมาชิก</Link></Button>
//                 </>
//                 )}
//               </Fragment>
//             </Col>
//           </Row>
//         </Dialog>
//       </div>
//     )
//   }
// }

// AppNavMenu.propTypes = {
//   title: PropTypes.string.isRequired,
// }
// export default withRouter(AppNavMenu)

