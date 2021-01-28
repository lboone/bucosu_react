import {Fragment, useEffect } from 'react'
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'

// Components
import Navbar  from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'

// Routes
import AdminRoutes from './routes/admin'
import AuthorizedRoutes from './routes/authorized'
import BcsRoutes from './routes/bcs'
import DashboardRoutes from './routes/dashboard'
import ProjectsRoutes from './routes/projects'

// Stylesheet
import './App.css';

// Manage local storage & Auth Token
import {
  getItem,
} from './utils/manageLocalStorage'
import setAuthToken from './utils/setAuthToken'

if(getItem('token')){
  setAuthToken(getItem('token'))
}
const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
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
            </Switch>
            <AdminRoutes />
            <AuthorizedRoutes />
            <BcsRoutes />
            <DashboardRoutes />
            <ProjectsRoutes />
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
