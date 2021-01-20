
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


const PrivateRoute = ({component: Component, companyLevel, userLevel, auth: {isAuthenticated, loading, level }, ...rest }) => (
  <Route 
    { ...rest } 
    render={props => 
      (!isAuthenticated && !loading) || (!loading && (!level || level.company > companyLevel || level.user > userLevel)) ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    } 
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)
