import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'


const QuestionsContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="Questions">
      <h2>Questions Page</h2>
    </PageWithNavbar>
  )
}

QuestionsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(QuestionsContainer)
  