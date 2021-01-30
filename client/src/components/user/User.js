import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserHistoryList from './components/UserHistoryList'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'

const User = ( { auth } ) => {
  
  return (
    <PageWithoutNavbar title="User">
      <UserHistoryList />
    </PageWithoutNavbar>
  )
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(User)
  