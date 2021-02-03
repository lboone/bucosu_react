import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserHistoryList from './components/UserHistoryList'
import PageWithNavbar from '../layout/page/PageWithNavbar'

const User = ( { auth } ) => {
  
  return (
    <PageWithNavbar title="User">
      <UserHistoryList />
    </PageWithNavbar>
  )
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(User)
  