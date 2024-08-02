// Function to create a new course
const create = async (params, credentials, course) => {
  try {
    // Send a POST request to the server to create a new course for a specific user
    let response = await fetch('/api/courses/by/' + params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t // Add JWT token for authentication
      },
      body: course // Course data to be sent in the request body
    });
    return response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to list all courses
const list = async (signal) => {
  try {
    // Send a GET request to the server to fetch all courses
    let response = await fetch('/api/courses/', {
      method: 'GET',
      signal: signal, // Signal for aborting the request if needed
    });
    return await response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to read a specific course
const read = async (params, signal) => {
  try {
    // Send a GET request to the server to fetch a specific course by ID
    let response = await fetch('/api/courses/' + params.courseId, {
      method: 'GET',
      signal: signal, // Signal for aborting the request if needed
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to update a specific course
const update = async (params, credentials, course) => {
  try {
    // Send a PUT request to the server to update a specific course by ID
    let response = await fetch('/api/courses/' + params.courseId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t // Add JWT token for authentication
      },
      body: course // Updated course data to be sent in the request body
    });
    return await response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to remove a specific course
const remove = async (params, credentials) => {
  try {
    // Send a DELETE request to the server to remove a specific course by ID
    let response = await fetch('/api/courses/' + params.courseId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t // Add JWT token for authentication
      }
    });
    return await response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to list courses by a specific instructor
const listByInstructor = async (params, credentials, signal) => {
  try {
    // Send a GET request to the server to fetch courses by instructor ID
    let response = await fetch('/api/courses/by/' + params.userId, {
      method: 'GET',
      signal: signal, // Signal for aborting the request if needed
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t // Add JWT token for authentication
      }
    });
    return response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to add a new lesson to a course
const newLesson = async (params, credentials, lesson) => {
  try {
    // Send a PUT request to the server to add a new lesson to a specific course
    let response = await fetch('/api/courses/' + params.courseId + '/lesson/new', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t // Add JWT token for authentication
      },
      body: JSON.stringify({ lesson: lesson }) // Lesson data to be sent in the request body
    });
    return response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Function to list all published courses
const listPublished = async (signal) => {
  try {
    // Send a GET request to the server to fetch all published courses
    let response = await fetch('/api/courses/published', {
      method: 'GET',
      signal: signal, // Signal for aborting the request if needed
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await response.json(); // Return the response as JSON
  } catch (err) {
    console.log(err); // Log any errors
  }
};

// Export all functions for use in other parts of the application
export {
  create,
  list,
  read,
  update,
  remove,
  listByInstructor,
  newLesson,
  listPublished
};
