// Import the signout function from the api-auth.js module
import { signout } from './api-auth.js'

// Define an auth object with various authentication-related methods
const auth = {
  // Check if a user is authenticated
  isAuthenticated() {
    // Return false if running on the server (window is undefined)
    if (typeof window == "undefined")
      return false

    // Check if a JWT token is stored in sessionStorage
    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt')) // Return the parsed JWT token
    else
      return false // Return false if no JWT token is found
  },

  // Authenticate a user by storing the JWT token
  authenticate(jwt, cb) {
    // Ensure code runs only in the browser
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt)) // Store the JWT token in sessionStorage
    cb() // Execute the callback function
  },

  // Clear the stored JWT token and optionally sign out
  clearJWT(cb) {
    // Ensure code runs only in the browser
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt') // Remove the JWT token from sessionStorage
    cb() // Execute the callback function
    
    // Optional: sign out the user by calling the signout function
    signout().then((data) => {
      // Clear the authentication cookie
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  },

  // Update the stored user information in the JWT token
  updateUser(user, cb) {
    // Ensure code runs only in the browser
    if (typeof window !== "undefined") {
      // Check if a JWT token is stored in sessionStorage
      if (sessionStorage.getItem('jwt')) {
        let auth = JSON.parse(sessionStorage.getItem('jwt')) // Parse the JWT token
        auth.user = user // Update the user information
        sessionStorage.setItem('jwt', JSON.stringify(auth)) // Store the updated JWT token
        cb() // Execute the callback function
      }
    }
  }
}

// Export the auth object as the default export
export default auth
