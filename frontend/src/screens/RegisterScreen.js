import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import{useSelector,useDispatch} from 'react-redux'
import {register} from '../actions/authActions.js'
import FormContainer from '../components/FormContainer.js'
import Message from '../components/Message.js'

import Loader from '../components/Loader.js'


const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const dispatch=useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userRegister = useSelector((state) => state.userRegister)
  const{loading,error,userInfo}=userRegister
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect,userInfo])
  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH REGISTER
    dispatch(register(name,email,password,passwordConfirm))
  }
  return (
    <FormContainer>
      <h1>Register </h1>
      {error && <Message variant='danger'>{error}</Message>}
      
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
          <Form.Text className='text-muted'>Enter your full name</Form.Text>
        </Form.Group>
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
        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={passwordConfirm}
            placeholder='Confirm Password'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Form.Text className='text-muted'>
            This should match your password
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already Exists?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
