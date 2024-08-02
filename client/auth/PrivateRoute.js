// Import necessary modules from React and react-router-dom
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

// Define a PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => (
  // Render a Route component with the passed props (...rest)
  <Route {...rest} render={props => (
    // Check if the user is authenticated
    auth.isAuthenticated() ? (
      // If authenticated, render the passed component with props
      <Component {...props}/>
    ) : (
      // If not authenticated, redirect to the signin page
      <Redirect to={{
        pathname: '/signin', // Path to redirect to
        state: { from: props.location } // Pass the current location in state
      }}/>
    )
  )}/>
)

// Export the PrivateRoute component as the default export
export default PrivateRoute
