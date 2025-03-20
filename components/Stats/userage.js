import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import 'antd/dist/antd.css';
import {
   makeStyles,
   withStyles,
   Container,
   Grid,
   Typography,
   Card,
   Table,
   TableBody,
   TableCell,
   TableRow,
} from '@material-ui/core'

import AppFooter from '../../components/Footer'
import Stats from '../../components/AllStats'
import getUserAge from '../../graphql/queries/getUserAge'
import client from '../../index'
import img from '../../images/homeBG.png'
import img2 from '../../images/BGcolor1.png'

const useStyles = makeStyles((theme) => ({
   root: {
     minHeight: '100%',
     paddingBottom: theme.spacing(0),
     paddingTop: theme.spacing(1)
 
   },
   root2: {
     minHeight: '100%',
   },
   bgSearchImage: {
     height: '450px',
     width: '100%',
     backgroundImage: `url(${img})`,
     backgroundRepeat: 'no-repeat',
     backgroundSize: 'cover',
     '@media (max-width: 768px)': {
       height: '400px',
     },
     '@media (max-width: 425px)': {
       backgroundImage: `url(${img2})`,
       height: '300px',
     },
     '@media (max-width: 320px)': {
       height: '260px',
     },
   },
   card:{
     width:'100%',
     backgroundColor:'#e21145',
   },
   table: {
     minWidth: 600,
     '@media (max-width: 425px)': {
       minWidth: 500,
     }
   },
   table1: {
     width: '100%',
     marginTop: theme.spacing(2),
     overflowX: 'auto',
   },
   avatar: {
     height: 100,
     width: 100,
     '@media (max-width: 425px)': {
       height: 60,
       width: 60,
     }
   },
   textlinktable: {
     color: '#263238',
     '&:hover': {
       color: '#41aea9'
     },
   },
   nav: {
     marginLeft:'5px',
     color: '#213e3b',
     backgroundColor:'#fff',
     '&:hover': {
       backgroundColor:'#c70039',
       color: '#fff',
     },
   },
   textboby: {
     color: '#41aea9',
     '&:hover': {
       color: '#0d7377'
     },
   },
   chip:{
     display: 'flex',
     justifyContent: 'center',
     marginTop:'5px',
     '& > *': {
       margin: theme.spacing(0.5),
     },
     '@media (max-width: 280px)': {
       flexWrap: 'nowrap'
     },
   },
 }))

 const StyledTableCell = withStyles(()  => ({
   body: {
     fontSize: 18,
     '@media (max-width: 425px)': {
       fontSize: 16,
     }
   },
 }))(TableCell)
 
 const StyledTableRow = withStyles(()  => ({
   root: {
     '&:nth-of-type(odd)': {
       backgroundColor: '#ecf4f3',
     },
   },
 }))(TableRow)

const UserAge = () => {
   const classes = useStyles()
   const { data = { userAgeStat: [] } } = useQuery(getUserAge, {
      client,
      fetchPolicy: 'cache-and-network',
    })
    console.log(data.userAgeStat);
   return (
      <Fragment>
         <div className={classes.root2}>
            <Container maxWidth="lg" style={{backgroundColor:'#fff',marginTop: '80px'}}>
               <Grid item lg={12} xs={12}>
                  <Typography className="textbody01" align="center" variant="h5">ตารางแสดงจำนวนนักวิ่งแบ่งตามช่วงอายุทั้งระบบ</Typography>
                  {/* <Typography className="textbody04" align="center" variant="subtitle1">ตารางแสดง&nbsp;10&nbsp;อันดับ&nbsp;นักวิ่งที่มีจำนวนการเข้าร่วมวิ่งในสนามพาร์ครันไทยแลนด์เยอะที่สุด</Typography> */}
                  <Card className={classes.table1} elevation={0}>
                  <Table className={classes.table} aria-label="customized table">
                  <TableBody>
                  {data.userAgeStat.map((row, index) => (
                     <>
                     <StyledTableRow>
                        <StyledTableCell align="left">ไม่ทราบอายุ&nbsp;{row.Unknown}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุต่ำกว่า&nbsp;{row.Under19}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุ 20 - 29&nbsp;{row.age20_29}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุ 30 - 39&nbsp;{row.age30_39}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุ 40 - 49&nbsp;{row.age40_49}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุ 50 - 59&nbsp;{row.age50_59}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุ 60 - 69&nbsp;{row.age60_69}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุ 70 - 79&nbsp;{row.age70_79}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     <StyledTableRow>
                        <StyledTableCell align="left">อายุมากว่า 80&nbsp;{row.Over80}&nbsp;คน</StyledTableCell>
                     </StyledTableRow>
                     </>
                  ))}
                  </TableBody>
                  </Table>
                  </Card>
               </Grid>
            </Container>
         </div>
         {/* ----------------------สรุปสถิติ---------------------------------- */}
         <Stats />
         {/* ----------------------footer---------------------------------- */}
         <AppFooter description="795 ถนน บรรทัดทอง แขวง วังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330" />
      </Fragment>
   )
}

export default UserAge