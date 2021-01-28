import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Headings = ( { auth } ) => {
  return (
    <div>
      <h1>BCS Headings</h1>
    </div>
  )
}

Headings.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Headings)
  