import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Bread from '../components/Bread.js'


const DashboardScreen = () => {
  return (
    <div>
      {/* <ListGroup horizontal variant='flush'>
        <ListGroup.Item>
          {' '}
          <LinkContainer to='/dashboard/home' active>
            <span>Placement Home</span>
          </LinkContainer>
        </ListGroup.Item>
        <ListGroup.Item>Placement statistics</ListGroup.Item>
        <ListGroup.Item>Companies Visited</ListGroup.Item>
        <ListGroup.Item>Tips for Campus Placement</ListGroup.Item>
        <ListGroup.Item>Contact Placement Team</ListGroup.Item>
      </ListGroup> */}
    
      <Container>
        <Row>
          <Col>
            <h1>This is the DashBoard Home Screen</h1>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DashboardScreen
