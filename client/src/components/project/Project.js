import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Project = ( { auth } ) => {
  return (
    <div>
      <h1>Project</h1>
    </div>
  )
}

Project.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Project)
  