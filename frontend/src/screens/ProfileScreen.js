import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import Message from '../components/Message.js'
import { logout } from '../actions/authActions.js'

import Loader from '../components/Loader.js'
import {
  getStudentDetails,
  updateStudentDetails,
} from '../actions/studentActions.js'

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const studentDetails = useSelector((state) => state.studentDetails)
  const { loading, error, user } = studentDetails

  const studentDetailsUpdate = useSelector(
    (state) => state.studentDetailsUpdate
  )
  const { success, error: errorUpdate } = studentDetailsUpdate
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        // this 'profile' is reflected as id in userActions
        dispatch(getStudentDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, user, userInfo, dispatch])
  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH REGISTER
    dispatch(
      updateStudentDetails({
        id: user._id,
        name,
        email,
        password,
        passwordConfirm,
      })
    )
    // dispatch(logout())
  }
  return (
    <FormContainer>
      <h1>Edit Profile </h1>
      {error && <Message variant='danger'>{error}</Message>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {success && <Message variant='success'>{'Profile updated!'}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            placeholder='Enter Name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={passwordConfirm}
            placeholder='Confirm Password'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen
