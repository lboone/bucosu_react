import {Fragment, useEffect } from 'react'
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom'

import Navbar  from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'

import './App.css';

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
          <Navbar />
          <Route exact path="/" component={ Landing }/>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
