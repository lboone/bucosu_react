import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editCompanyType, getCompanyType } from '../../../../redux/actions/companytype'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import { Skeleton } from 'antd'

const EditCompanyType = ({ companytype:{loading, companytype}, editCompanyType, setAlert, id , getCompanyType}) => {  
  const history = useHistory()

  useEffect(()=>{ id && getCompanyType(id) } , [ id , getCompanyType ] )
  
  const initialState = {
    name: "",
    startdate: "",
    enddate: "",
    isactive: true,
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    setFormData({
      name: loading || !companytype  ? '' : companytype.name,
      description: loading || !companytype  ? '' : companytype.description,
      level: loading || !companytype ? '' : companytype.level,
    })
  }, [ companytype, loading ])
  
  const { name, description, level } = formData
  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    editCompanyType({
      name, 
      description, 
      level, 
      id
    })
    .then(()=>{
      setFormData({...initialState})
      setAlert('Company Type has been saved','success',2000)
      setTimeout(()=>{
        history.push('/admin/bcs/company-types')
      },2500)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }
  return (
    <div className="container-center" style={{marginTop: '5px'}}>
      {companytype && !loading ? (
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <br />
        <p className="lead">
          <i className="fa fa-business-time"></i> Company Type Information.
        </p>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required          
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Level"
            name="level"
            value={level}
            onChange={e => onChange(e)}
            required
          />
        </div>
        
        <br />
        <Link to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Company Type</Link>
        <Link to="/admin/bcs/company-types" className="btn btn-danger btn-outline"><i className="fa fa-times"></i> Cancel</Link>
      </form>
      )  : (
        <>
        <Skeleton avatar active paragraph={{ rows: 4 }} /> 
        <Skeleton avatar active paragraph={{ rows: 4 }} />
        </>
      )}
    </div>
  )
}

EditCompanyType.propTypes = {
  editCompanyType: PropTypes.func.isRequired,
  getCompanyType: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  companytype: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
  companytype: state.companytype
})

export default connect(mapStateToProps,{editCompanyType, setAlert, getCompanyType})(EditCompanyType)