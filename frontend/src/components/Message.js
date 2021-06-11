import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
// const [show, setShow] = useState(true)
const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} >
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}
export default Message
