import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Menus = ( { auth } ) => {
  return (
    <div>
      <h1>Nav Menus</h1>
    </div>
  )
}

Menus.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Menus)
  