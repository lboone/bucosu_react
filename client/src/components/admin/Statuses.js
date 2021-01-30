import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Statuses = ( { auth } ) => {
  return (
    <div>
      <h1>Project Statuses</h1>
      <hr/>
    </div>
  )
}

Statuses.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Statuses)
  