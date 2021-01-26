import {Fragment, useEffect } from 'react'
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom'

import Navbar  from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/auth/Register'
import PrivateRoute from './components/routing/PrivateRoute'


// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'

import './App.css';

import {
  getItem,
} from './utils/manageLocalStorage'
import setAuthToken from './utils/setAuthToken'
import { ACCESSTYPES } from './utils/constants'
import Sidebar from './components/layout/Sidebar'

if(getItem('token')){
  setAuthToken(getItem('token'))
}
const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const { COMPANY, USER } = ACCESSTYPES
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Sidebar />
          
          <Route exact path="/" component={ Landing }/>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} companyLevel={ COMPANY.SCHOOLDISTRICT } userLevel={ USER.READER }/>
              <PrivateRoute exact path="/register" component={Register} companyLevel={ COMPANY.SCHOOLDISTRICT } userLevel={ USER.ADMIN }/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
