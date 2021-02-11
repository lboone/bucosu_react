import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminEditCompanyType, adminGetCompanyTypes  } from '../../../../redux/actions/admin/companytype'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'
import UserTypeSelect from '../../../layout/ui/fields/UserTypeSelect'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import {Row, Col, Tabs } from 'antd'
const { TabPane } = Tabs

const EditCompanyType = ({ adminCompanyType:{companytypes}, adminEditCompanyType, adminGetCompanyTypes, setAlert, index  }) => {  
  const history = useHistory()
  const [companyType, setCompanyType] = useState(null)
  const [companyTypeIndex, setCompanyTypeIndex] = useState(null)

  useEffect(()=> index && setCompanyTypeIndex(index), [index])
  useEffect(()=> companyTypeIndex && !companyType && companytypes && companytypes.length > 0 && setCompanyType(companytypes[companyTypeIndex]),[companyTypeIndex, companyType, companytypes])
  
  const initialState = {
    name: "",
    description: "",
    level: "",
    usertype: ""
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    setFormData({
      ...formData,
      name: !companyType  ? '' : companyType.name,
      description: !companyType  ? '' : companyType.description,
      level: !companyType ? '' : companyType.level,
    })
  }, [ companyType ])
  
  const { name, description, level, usertype } = formData
  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const clickRemoveUserType = (index) =>{
    console.log({clickedUserType:index})
  }

  const addUserType = (e) => {
    e.preventDefault()
    console.log({e})
  }
  const onSubmit = e => {
    e.preventDefault()
    adminEditCompanyType({
      name, 
      description, 
      level, 
      id:companyType._id
    })
    .then(()=>{
      setAlert('Company Type has been saved','success',2000)
      adminGetCompanyTypes()
      setTimeout(()=>{
        history.push('/admin/bcs/company-types')
      },2500)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }
  return (
    <div className="content-center" style={{marginTop: '5px'}}>
      <Tabs tabPosition={"left"}>
        <TabPane tab="Edit Company Type" key="1">
        <>
          {companyType ? (
          <form className="form" onSubmit= {e => onSubmit(e)}>
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
            <SkeletonList rows={4} paragraphs={4} /> 
            </>
          )}
          </>
        </TabPane>
        <TabPane tab="Manage User Types" key="2">
        <>
          {
            !companyType || !companyType.usertypes ? 
            ( <SkeletonList  rows={4} paragraphs={4} /> )
            :
            (
              <>
                
                <form action="" className="form" onSubmit={e=>e.preventDefault()}>
                  <p className="lead">
                    <i className="fa fa-user-tag"></i> {`Add User Type to ${name && name}.`}
                  </p>
                  <Row justify="end" align="middle">    
                    <Col flex="auto">
                      <UserTypeSelect 
                        value={usertype} 
                        name={"usertype"} 
                        onChange={ e =>onChange(e)}
                        filter={companyType.usertypes}
                      />
                    </Col>
                    <Col className="text-center" flex="100px">
                      {usertype ? (<Link onClick={e => addUserType(e)} to="#" s className="btn btn-primary btn-outline"><i className="fa fa-plus"></i>Add</Link>) : (<Link onClick={e => e.preventDefault()} to="#" s className="btn btn-light btn-outline"><i className="fa fa-plus"></i>Add</Link>)}
                      
                    </Col>
                  </Row>
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="hide-md">Description</th>
                      <th className="hide-md">Level</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyType && companyType.usertypes && companyType.usertypes.map((usertype, index)=>{
                      return (
                        <tr key={usertype._id}>
                          <td>{usertype.name}</td>
                          <td className="hide-md">{usertype.description}</td>
                          <td className="hide-md">{usertype.level}</td>
                          <td className="text-center">{(
                              <>
                                <DeleteButton confirmDelete={(e)=> clickRemoveUserType(index)} title="Remove" itemName="Company Type"/>
                              </>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )
          }
        </>
        </TabPane>
      </Tabs>
    </div>
  )
}

EditCompanyType.propTypes = {
  adminEditCompanyType: PropTypes.func.isRequired,
  adminGetCompanyTypes: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  adminCompanyType: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
  adminCompanyType: state.adminCompanyType
})

export default connect(mapStateToProps,{adminEditCompanyType, adminGetCompanyTypes, setAlert, })(EditCompanyType)