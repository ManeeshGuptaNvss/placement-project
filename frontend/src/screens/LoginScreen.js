import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { login } from '../actions/authActions.js'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  console.log(history, location)
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])
  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH LOGIN
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>LogIn </h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className='text-muted'>
            A min of 6 characters is needed
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit'>
          LogIn
        </Button>
      </Form>
      <Row>
        <Col>
          New User?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
