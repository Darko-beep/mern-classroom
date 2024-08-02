// Asynchronous function to handle user sign-in
const signin = async (user) => {
  try {
    // Make a POST request to the sign-in endpoint
    let response = await fetch('/auth/signin/', {
      method: 'POST', // HTTP method set to POST
      headers: {
        'Accept': 'application/json', // Expect JSON response
        'Content-Type': 'application/json' // Send JSON request body
      },
      credentials: 'include', // Include credentials (cookies) in the request
      body: JSON.stringify(user) // Convert user object to JSON string
    });

    // Parse and return the JSON response from the server
    return await response.json();
  } catch(err) {
    // Log any errors that occur during the request
    console.log(err);
  }
}

// Asynchronous function to handle user sign-out
const signout = async () => {
  try {
    // Make a GET request to the sign-out endpoint
    let response = await fetch('/auth/signout/', { method: 'GET' });

    // Parse and return the JSON response from the server
    return await response.json();
  } catch(err) {
    // Log any errors that occur during the request
    console.log(err);
  }
}

// Export the signin and signout functions for use in other modules
export {
  signin,
  signout
}
