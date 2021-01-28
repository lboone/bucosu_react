import {Fragment, useEffect } from 'react'
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom'

import Navbar  from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import Bcs from './components/bcs/Bcs'
import Events from './components/bcs/Events'
import Reports from './components/bcs/Reports'
import Help from './components/bcs/Help'
import Project from './components/project/Project'
import Manage from './components/project/Manage'
import Timeline from './components/project/Timeline'
import Calendar from './components/project/Calendar'
import Report from './components/project/Report'
import Authorized from './components/authorized/Authorized'
import Users from './components/authorized/Users'
import Register from './components/authorized/Register'
import Admin from './components/admin/Admin'
import Menus from './components/admin/Menus'
import Headings from './components/admin/Headings'
import Purposes from './components/admin/Purposes'
import Statuses from './components/admin/Statuses'
import Types from './components/admin/Types'
import UserData from './components/admin/UserData'

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
          <Navbar/>
          
          <Route exact path="/" component={ Landing }/>
          <section className="container">
            <Alert />
            <Switch>
              <Route 
                exact 
                path="/login" 
                component={Login} 
              />
              <PrivateRoute 
                exact 
                path="/dashboard" 
                component={Dashboard} 
                companyLevel={ COMPANY.SCHOOLDISTRICT } 
                userLevel={ USER.READER }
              />
              <PrivateRoute 
                exact 
                path="/bcs" 
                component={Bcs} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.READER}
              />
              <PrivateRoute 
                exact 
                path="/bcs/events" 
                component={Events} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.AUTHOR}
              />
              <PrivateRoute 
                exact 
                path="/bcs/reports" 
                component={Reports} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.READER}
              />
              <PrivateRoute 
                exact 
                path="/bcs/help" 
                component={Help} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.AUTHOR}
              />
              <PrivateRoute 
                exact 
                path="/projects" 
                component={Project} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.READER}
              />
              <PrivateRoute 
                exact 
                path="/projects/manage" 
                component={Manage} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.EDITOR}
              />
              <PrivateRoute 
                exact 
                path="/projects/timeline" 
                component={Timeline} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.READER}
              />
              <PrivateRoute 
                exact 
                path="/projects/calendar" 
                component={Calendar} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.READER}
              />
              <PrivateRoute 
                exact 
                path="/projects/reports" 
                component={Report} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.READER}
              />
              <PrivateRoute 
                exact 
                path="/authorized" 
                component={Authorized} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.ADMIN}
              />
              <PrivateRoute 
                exact 
                path="/authorized/users" 
                component={Users} 
                companyLevel={COMPANY.SCHOOLDISTRICT}
                userLevel={USER.ADMIN}
              />
              <PrivateRoute 
                exact 
                path="/authorized/register" 
                component={Register} 
                companyLevel={ COMPANY.SCHOOLDISTRICT } 
                userLevel={ USER.ADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin" 
                component={Admin} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin/menus" 
                component={Menus} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin/headings" 
                component={Headings} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin/purposes" 
                component={Purposes} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin/statuses" 
                component={Statuses} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin/types" 
                component={Types} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
              <PrivateRoute 
                exact 
                path="/admin/userdata" 
                component={UserData} 
                companyLevel={ COMPANY.ADMIN } 
                userLevel={ USER.SUPERADMIN }
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
