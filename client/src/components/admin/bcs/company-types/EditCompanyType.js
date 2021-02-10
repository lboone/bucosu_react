import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editCompanyType, getCompanyType } from '../../../../redux/actions/companytype'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'
import UserTypeSelect from '../../../layout/ui/fields/UserTypeSelect'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import {Row, Col, Tabs } from 'antd'
const { TabPane } = Tabs

const EditCompanyType = ({ companytype:{loading, companytype}, editCompanyType, setAlert, id , getCompanyType}) => {  
  const history = useHistory()

  useEffect(()=>{ id && getCompanyType(id) } , [ id , getCompanyType ] )
  
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
      name: loading || !companytype  ? '' : companytype.name,
      description: loading || !companytype  ? '' : companytype.description,
      level: loading || !companytype ? '' : companytype.level,
    })
  }, [ companytype, loading ])
  
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
    <div className="content-center" style={{marginTop: '5px'}}>
      <Tabs tabPosition={"left"}>
        <TabPane tab="Edit Company Type" key="1">
        <>
          {companytype && !loading ? (
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
            !companytype || !companytype.usertypes || loading ? 
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
                        filter={companytype.usertypes}
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
                    {companytype && companytype.usertypes && companytype.usertypes.map((usertype, index)=>{
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
  editCompanyType: PropTypes.func.isRequired,
  getCompanyType: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  companytype: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
  companytype: state.companytype
})

export default connect(mapStateToProps,{editCompanyType, setAlert, getCompanyType})(EditCompanyType)