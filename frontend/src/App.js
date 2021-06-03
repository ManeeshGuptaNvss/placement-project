import React from 'react'
import HomeScreen from './screens/HomeScreen.js'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import PostsScreen from './screens/PostsScreen'
import NoticeboardScreen from './screens/NoticeboardScreen'
import DashboardScreen from './screens/DashboardScreen'
const App = ({ name }) => {
  return (
    <Router>
      <Header />
     
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/posts' component={PostsScreen} exact />
          <Route path='/noticeboard' component={NoticeboardScreen} exact />
          <Route path='/dashboard' component={DashboardScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
