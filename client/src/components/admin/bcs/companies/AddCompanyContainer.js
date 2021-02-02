import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {useLocation} from 'react-router-dom'
import queryString from 'query-string'
import AddCompany from './AddCompany'
import EditCompany from './EditCompany'

const AddCompanyContainer = ( { auth } ) => {
  const params = useLocation()
  const [results, setResults] = useState(null)
  useEffect(()=>{
      setResults(queryString.parse(params.search))
  },[setResults,params])
  
  const action = results ? results.action : null
  return (
    <>
    {
      action === 'add' ? 
        (<AddCompany data={{results,setResults}}/>) : (<EditCompany data={{results,setResults}}/>)
    }
    </>
  )
}

AddCompanyContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(AddCompanyContainer)
  