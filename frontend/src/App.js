import React from 'react'
import HomeScreen from './screens/HomeScreen.js'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import ProfileScreen from './screens/ProfileScreen.js'
import Navbar from './components/Navbar.js'
import PostsScreen from './screens/PostsScreen'
import NoticeboardScreen from './screens/NoticeboardScreen'
import DashboardScreen from './screens/DashboardScreen'
import TipsScreen from './screens/TipsScreen.js'
import TeamScreen from './screens/TeamScreen.js'
import StatisticsScreen from './screens/StatisticsScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
// import Bread from './components/Bread.js'
const App = ({ name }) => {
  return (
    <Router>
      <Header />
      {/* <Bread /> */}
      <main >
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen}  />
          <Route path='/profile' component={ProfileScreen}  />
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/posts' component={PostsScreen} exact />
          <Route path='/noticeboard' component={NoticeboardScreen} exact />
          <Route path='/dashboard/tips' component={TipsScreen} exact />
          <Route
            path='/dashboard/statistics'
            component={StatisticsScreen}
            exact
          />
          <Route path='/dashboard/team' component={TeamScreen} exact />
          <Route path='/dashboard' component={DashboardScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
