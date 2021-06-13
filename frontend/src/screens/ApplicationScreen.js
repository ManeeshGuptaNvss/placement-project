import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import Message from '../components/Message.js'

import Loader from '../components/Loader.js'
import axios from 'axios'

const ApplicationScreen = ({ location, history }) => {
  const [roll, setRoll] = useState('')
  const [department, setDepartment] = useState('')
  const [gender, setGender] = useState('')
  const [cgpa, setCgpa] = useState('')
  const [tenthMarks, setTenthMarks] = useState('')
  const [interMarks, setInterMarks] = useState('')
  const [diplomaMarks, setDiplomaMarks] = useState('')
  const [mobile, setMobile] = useState('')
  const [resume, setResume] = useState('')
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  useEffect(() => {}, [history, userInfo])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('resume', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/v1/uploads', formData, config)
      setResume(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH APPLICATION
  }
  return (
    <FormContainer>
      <h1>Application </h1>
      {error && <Message variant='danger'>{error}</Message>}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6} sm={6} xs={6}>
            <Form.Group controlId='roll'>
              <Form.Label>Roll</Form.Label>
              <Form.Control
                required
                type='text'
                value={roll}
                placeholder='Enter Roll Number'
                onChange={(e) => setRoll(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={6} xs={6}>
            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type='text'
                value={gender}
                placeholder='enter gender'
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={6} xs={6}>
            <Form.Group controlId='department'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type='text'
                value={department}
                placeholder='Enter department'
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId='cgpa'>
              <Form.Label>CGPA</Form.Label>
              <Form.Control
                type='text'
                value={cgpa}
                placeholder='Enter CGPA'
                onChange={(e) => setCgpa(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tenthMarks'>
              <Form.Label>Tenth Marks</Form.Label>
              <Form.Control
                type='text'
                value={tenthMarks}
                placeholder='Enter Tenth marks'
                onChange={(e) => setTenthMarks(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='interMarks'>
              <Form.Label>Inter Marks</Form.Label>
              <Form.Control
                type='text'
                value={interMarks}
                placeholder='Enter Inter Marks'
                onChange={(e) => setInterMarks(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row></Row>

        <Form.Group controlId='diplomaMarks'>
          <Form.Label>Diploma Marks</Form.Label>
          <Form.Control
            type='text'
            value={diplomaMarks}
            placeholder='Enter Diploma Marks'
            onChange={(e) => setDiplomaMarks(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='mobile'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='text'
            value={mobile}
            placeholder='Enter Mobile Number'
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mt-2' controlId='resume'>
          <Form.Label>Upload Resume</Form.Label>
          <Form.Control
            type='text'
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          <Form.File
            id='resume-file'
            custom
            onChange={uploadFileHandler}
          ></Form.File>
          {uploading && <Loader />}
              </Form.Group>
              
              
        <Button variant='primary' className='mt-3' type='submit'>
          Submit Application
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ApplicationScreen
