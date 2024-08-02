import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-course.js'

// DeleteCourse component definition
export default function DeleteCourse(props) {
  const [open, setOpen] = useState(false) // State for managing dialog open/close
  const jwt = auth.isAuthenticated() // Retrieve authenticated user token
  
  // Function to open the confirmation dialog
  const clickButton = () => {
    setOpen(true)
  }
  
  // Function to delete the course
  const deleteCourse = () => {
    remove({
      courseId: props.course._id // Course ID to be deleted
    }, {t: jwt.token}).then((data) => { // Pass the token for authentication
      if (data.error) {
        console.log(data.error) // Log error if any
      } else {
        setOpen(false) // Close the dialog
        props.onRemove(props.course) // Call onRemove callback to update the parent component
      }
    })
  }
  
  // Function to close the confirmation dialog
  const handleRequestClose = () => {
    setOpen(false)
  }

  return (
    <span>
      {/* Delete button to open the dialog */}
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      {/* Confirmation dialog */}
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete " + props.course.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your course {props.course.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCourse} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}

// Prop types validation
DeleteCourse.propTypes = {
  course: PropTypes.object.isRequired, // Course object to be deleted
  onRemove: PropTypes.func.isRequired // Callback function after course deletion
}
