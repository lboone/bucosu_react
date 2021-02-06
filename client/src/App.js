import {Fragment, useEffect } from 'react'
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './redux/actions/auth'

// Components
import Navbar  from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'

// Routes
import AllRoutes from './routes'

// Stylesheet
import './App.css';
import '../node_modules/antd/dist/antd.css';

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
          <section className="container-full">
            <Switch>
              <Route 
                exact 
                path="/login" 
                component={Login} 
              />
            </Switch>
            <AllRoutes />
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
