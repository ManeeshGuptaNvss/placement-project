import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer className='foot'>
      <Container fluid>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Sri Venkateswara Univeristy College of Engineering
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
