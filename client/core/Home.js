import React, {useState, useEffect} from 'react'; // Import necessary hooks and React library
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles for styling
import Card from '@material-ui/core/Card'; // Import Card component from Material-UI
import Divider from '@material-ui/core/Divider'; // Import Divider component from Material-UI
import {listPublished} from './../course/api-course'; // Import listPublished function for fetching published courses
import {listEnrolled, listCompleted} from './../enrollment/api-enrollment'; // Import listEnrolled and listCompleted functions for fetching enrollment data
import Typography from '@material-ui/core/Typography'; // Import Typography component from Material-UI
import auth from './../auth/auth-helper'; // Import authentication helper
import Courses from './../course/Courses'; // Import Courses component
import Enrollments from '../enrollment/Enrollments'; // Import Enrollments component

// Define custom styles using makeStyles hook
const useStyles = makeStyles(theme => ({
  card: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: theme.spacing(2),
    padding: 20,
    backgroundColor: '#ffffff'
  },
  extraTop: {
    marginTop: theme.spacing(12)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  enrolledTitle: {
    color: '#efefef',
    marginBottom: 5
  },
  action: {
    margin: '0 10px'
  },
  enrolledCard: {
    backgroundColor: '#616161'
  },
  divider: {
    marginBottom: 16,
    backgroundColor: 'rgb(157, 157, 157)'
  },
  noTitle: {
    color: 'lightgrey',
    marginBottom: 12,
    marginLeft: 8
  }
}));

// Define the Home component
export default function Home() {
  const classes = useStyles(); // Use the custom styles
  const jwt = auth.isAuthenticated(); // Get the authentication token if the user is authenticated
  const [courses, setCourses] = useState([]); // Initialize state to store published courses
  const [enrolled, setEnrolled] = useState([]); // Initialize state to store enrolled courses

  // useEffect to fetch enrolled courses when the component mounts
  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController to cancel fetch requests
    const signal = abortController.signal; // Get the signal from the AbortController

    // Fetch enrolled courses
    listEnrolled({t: jwt.token}, signal).then((data) => {
      if (data.error) {
        console.log(data.error); // Log error if any
      } else {
        setEnrolled(data); // Set the enrolled courses state
      }
    });

    // Cleanup function to abort the fetch request if the component unmounts
    return function cleanup() {
      abortController.abort();
    };
  }, [jwt.token]); // Dependency array ensures the effect runs only when the jwt.token changes

  // useEffect to fetch published courses when the component mounts
  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController to cancel fetch requests
    const signal = abortController.signal; // Get the signal from the AbortController

    // Fetch published courses
    listPublished(signal).then((data) => {
      if (data.error) {
        console.log(data.error); // Log error if any
      } else {
        setCourses(data); // Set the published courses state
      }
    });

    // Cleanup function to abort the fetch request if the component unmounts
    return function cleanup() {
      abortController.abort();
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className={classes.extraTop}>
      {/* Conditionally render enrolled courses if the user is authenticated */}
      {auth.isAuthenticated().user && (
        <Card className={`${classes.card} ${classes.enrolledCard}`}>
          <Typography variant="h6" component="h2" className={classes.enrolledTitle}>
            Courses you are enrolled in
          </Typography>
          {/* Render the Enrollments component if there are enrolled courses, otherwise show a message */}
          {enrolled.length !== 0 ? (
            <Enrollments enrollments={enrolled} />
          ) : (
            <Typography variant="body1" className={classes.noTitle}>No courses.</Typography>
          )}
        </Card>
      )}
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {/* Render the Courses component if there are new courses, otherwise show a message */}
        {(courses.length !== 0 && courses.length !== enrolled.length) ? (
          <Courses courses={courses} common={enrolled} />
        ) : (
          <Typography variant="body1" className={classes.noTitle}>No new courses.</Typography>
        )}
      </Card>
    </div>
  );
}
