import React from 'react'
import {Link} from 'react-router-dom'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'

const EditCompany = ( { data: {results, setResults} } ) => {
  return (
    <PageWithNavbar title="Add Company">
      <h2>Edit Company Page</h2>
      <ul>
        { results && 
          Object.keys(results).length > 0 && 
          Object.keys(results).map((keyName, keyIndex) => {
            return (<li key={keyIndex}>{results[keyName]}</li>)
          })
        }
      </ul>
      <div className="content-center">
        What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <input className='btn btn-primary' onClick={(e)=> setResults({...results, action:'add'})} value="Add" />
        <Link to="/admin/bcs/companies/addcompany?action=add&id=123456" className="btn btn-bucosu"><i className="fa fa-plus" title="Add Company"></i>{" "}Add Company</Link> 
      </div>
    </PageWithNavbar>
  )
}

export default EditCompany
  