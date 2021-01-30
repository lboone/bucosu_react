import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserHistoryList from './components/UserHistoryList'


const User = ( { auth } ) => {
  
  return (
    <Fragment>
      <h1>User</h1>
      <hr/>
      <UserHistoryList />
    </Fragment>
  )
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(User)
  