// Import necessary modules and components from React and Material-UI
import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'

// Define styles using Material-UI's makeStyles hook
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

// Define the Signin component
export default function Signin(props) {
  // Use the styles defined above
  const classes = useStyles()
  // Define state variables using useState hook
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })

  // Handle form submission
  const clickSubmit = () => {
    // Create a user object from the state values
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    // Call the signin function and handle the response
    signin(user).then((data) => {
      if (data.error) {
        // If there's an error, update the state with the error message
        setValues({ ...values, error: data.error})
      } else {
        // If successful, authenticate the user and redirect
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true})
        })
      }
    })
  }

  // Handle changes to the input fields
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  // Destructure from and redirectToReferrer from the state
  const {from} = props.location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
  // If redirectToReferrer is true, redirect to the original page
  if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  // Render the Signin form
  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}
