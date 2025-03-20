import React from 'react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  Container,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  FormHelperText,
} from '@material-ui/core'

const Gender = [
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'female',
    label: 'female',
  },
]

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '40px',
    flexGrow: 10,
    padding: 10,
    '@media (max-width: 959px)': {
      marginTop: '50px',
      padding: 0,
    },
  },
  
}))

const Passport = ({ className, ...rest }) => {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <div className={clsx(classes.root, className)} {...rest}>
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                passport: '',
                birthday: '',
                gender: '',
                phone: '',
                emergency: '',
                allergy: '',
                email: '',
                password: '',
                passwordConfirm: '',
                policy: false,
              }}
              validationSchema={
              Yup.object().shape({
                firstName: Yup.string().max(255).required('First name is required.'),
                lastName: Yup.string().max(255).required('Last name is required.'),
                passport: Yup.string().max(255).required('Passport number is required.'),
                country: Yup.string().max(255).required('Country is required.'),
                birthday: Yup.string().max(255).required('Birthday is required.'),
                gender: Yup.string().max(255).required('Gender is required.'),
                phone: Yup.string().max(10).required('Phone number is required.'),
                emergency: Yup.string().max(10).required('Emergency phone number is required.'),
                allergy: Yup.string().max(255).required('A history of drug allergy is required.'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required.'),
                password: Yup.string().max(255).required('password is required.'),
                passwordConfirm: Yup.string().max(255).required('Confirm password is required.'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked'),
              })
            }
              onSubmit={() => {
                NavLink('/home', { replace: true })
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit} noValidate className={clsx(classes.root, className)} {...rest}>
                  <Card>
                    <CardHeader subheader=" Use your email to create new account" title="Register" />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            error={Boolean(touched.firstName && errors.firstName)}
                            label="First Name"
                            helperText={touched.firstName && errors.firstName}
                            name="firstName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.lastName && errors.lastName)}
                            fullWidth
                            helperText={touched.lastName && errors.lastName}
                            label="Last Name"
                            name="lastName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            error={Boolean(touched.passport && errors.passport)}
                            label="Passport Number"
                            helperText={touched.passport && errors.passport}
                            name="passport"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.passport}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            error={Boolean(touched.country && errors.country)}
                            label="Country"
                            helperText={touched.country && errors.country}
                            name="country"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.country}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <TextField
                            error={Boolean(touched.birthday && errors.birthday)}
                            fullWidth
                            helperText={touched.birthday && errors.birthday}
                            label="Birthday"
                            name="birthday"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.birthday}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <TextField
                            error={Boolean(touched.gender && errors.gender)}
                            fullWidth
                            helperText={touched.gender && errors.gender}
                            label="Gender"
                            name="gender"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.gender}
                            SelectProps={{ native: true }}
                            select
                            required
                            variant="outlined"
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
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <TextField
                            error={Boolean(touched.phone && errors.phone)}
                            fullWidth
                            helperText={touched.phone && errors.phone}
                            label="Phone Number"
                            name="phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <TextField
                            error={Boolean(touched.emergency && errors.emergency)}
                            fullWidth
                            helperText={touched.emergency && errors.emergency}
                            label="Emergencyphone Number"
                            name="emergency"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.emergency}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.allergy && errors.allergy)}
                            fullWidth
                            helperText={touched.allergy && errors.allergy}
                            label="A history of drug allergy"
                            name="allergy"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.allergy}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email Address"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                            require
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.password}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                            fullWidth
                            helperText={touched.passwordConfirm && errors.passwordConfirm}
                            label="Confirm Password"
                            name="passwordConfirm"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="passwordConfirm"
                            value={values.passwordConfirm}
                            required
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>
                      {errors.policy}
                    </FormHelperText>
                    )}
                    <Box display="flex" justifyContent="flex-end" p={2}>
                      <Button color="primary" variant="contained" disabled={isSubmitting}>
                        Sign up now
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      style={{ marginLeft: '10px' }}
                    >
                      Have an account ?
                      {' '}
                      <NavLink
                        to="/actions/login"
                        variant="h5"
                      >
                        Sign in
                      </NavLink>
                    </Typography>
                  </Card>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Passport
