import React from 'react'; // Import React library
import AppBar from '@material-ui/core/AppBar'; // Import AppBar component from Material-UI
import Toolbar from '@material-ui/core/Toolbar'; // Import Toolbar component from Material-UI
import Typography from '@material-ui/core/Typography'; // Import Typography component from Material-UI
import IconButton from '@material-ui/core/IconButton'; // Import IconButton component from Material-UI
import HomeIcon from '@material-ui/icons/Home'; // Import HomeIcon from Material-UI icons
import Library from '@material-ui/icons/LocalLibrary'; // Import Library icon from Material-UI icons
import Button from '@material-ui/core/Button'; // Import Button component from Material-UI
import auth from './../auth/auth-helper'; // Import authentication helper
import {Link, withRouter} from 'react-router-dom'; // Import Link and withRouter from react-router-dom

// Function to check if the current path matches the given path for active link styling
const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#f57c00'}; // Highlight color for active link
  else
    return {color: '#fffde7'}; // Default color for inactive link
}

// Function to check if the current path includes the given path for partial active link styling
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#fffde7', backgroundColor: '#f57c00', marginRight:10}; // Highlight style for partial active link
  else
    return {color: '#616161', backgroundColor: '#fffde7', border:'1px solid #f57c00', marginRight:10}; // Default style for inactive link
}

// Define the Menu component using withRouter to get access to history
const Menu = withRouter(({history}) => (
  <AppBar position="fixed" style={{zIndex:12343455}}> {/* AppBar with fixed position and custom zIndex */}
    <Toolbar> {/* Toolbar within the AppBar */}
      <Typography variant="h6" color="inherit"> {/* Application title */}
        MERN Classroom
      </Typography>
      <div> {/* Home link */}
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}> {/* Home icon button */}
            <HomeIcon/>
          </IconButton>
        </Link>
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}> {/* Right aligned section */}
      {
        !auth.isAuthenticated() && (<span> {/* Show Sign up and Sign In buttons if the user is not authenticated */}
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up</Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In</Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span> {/* Show My Profile and Sign out buttons if the user is authenticated */}
          {auth.isAuthenticated().user.educator && (<Link to="/teach/courses"><Button style={isPartActive(history, "/teach/")}><Library/> Teach</Button></Link>)} {/* Show Teach button if the user is an educator */}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/')) // Clear JWT and redirect to home on Sign out
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
));

export default Menu; // Export the Menu component
