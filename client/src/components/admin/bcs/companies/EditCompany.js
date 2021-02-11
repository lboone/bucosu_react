import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { adminGetCompanies, adminUpdateCompany } from '../../../../redux/actions/admin/company'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'
import {Col, Divider, Row, Tabs } from 'antd'
import Relationships from './Relationships'
import CompaniesSelect from '../../../layout/ui/fields/CompaniesSelect'
const {TabPane} = Tabs

const EditCompany = ({ adminCompany:{companies, loading}, index, adminGetCompanies, adminUpdateCompany, setAlert }) => {  
  const history = useHistory()
  const [company, setCompany] = useState(null)
  const [companyIndex, setCompanyIndex] = useState(null)

  useEffect(()=> index && setCompanyIndex(index), [ index ])
  useEffect(() => companyIndex && !company && companies && companies.length > 0 && setCompany(companies[companyIndex]), [ companyIndex,company, companies ])

  const initialState = {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    website: "",
    cmpny: "",
    logo: "",
    isactive: true,
  }
  const [formData, setFormData] = useState(initialState)
  const { name, address, city, state, zip, phone, website, logo, isactive, cmpny} = formData
  

  useEffect(()=>{
    setFormData({
      ...formData,
      name: !company  ? '' : company.name,
      address: !company  ? '' : company.companyaddress.address,
      city: !company  ? '' : company.companyaddress.city,
      state: !company  ? '' : company.companyaddress.state,
      zip: !company  ? '' : company.companyaddress.zip,
      phone: !company  ? '' : company.contact.phone,
      website: !company  ? '' : company.contact.website,
      logo: !company  ? '' : company.contact.logo,
      isactive: !company ? '' : company.isactive,
    })
  }, [ company ])
  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    adminUpdateCompany({
      name, 
      address,
      city,
      state,
      zip,
      phone,
      website,
      logo,
      isactive,
      id: company._id
    })
    .then(()=>{
      setAlert('Company has been updated','success',2000)
      adminGetCompanies()
      setTimeout(()=>{
        history.push('/admin/bcs/companies')
      },3000)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }

  const addCmpny = (e) => {
    e.preventDefault()
    console.log({e})
  }
  return (
    <div className="content-center" style={{marginTop: '5px'}}>
  <Tabs tabPosition={"left"}>
    <TabPane tab="Edit Company" key="1">
      <>
      {company && !loading ? 
      (<form className="form" onSubmit= {e => onSubmit(e)}>
        <p className="lead">
          <i className="fa fa-briefcase"></i> Company Information.
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
            placeholder="Address"
            name="address"
            value={address}
            onChange={e => onChange(e)}
            required          
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={e => onChange(e)}
            required          
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="State"
            name="state"
            value={state}
            onChange={e => onChange(e)}
            required          
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Zip"
            name="zip"
            value={zip}
            onChange={e => onChange(e)}
            required          
          />
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={e => onChange(e)}
            required          
          />
          <small className="form-text">
            Format: 5554443333
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
            required          
          />
          <small className="form-text">
            Format: www.public.com
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Logo"
            name="logo"
            value={logo}
            onChange={e => onChange(e)}
            required          
          />
          <small className="form-text">
            Format: www.somesite.com/yourlogo.png
          </small>
        </div>                
        <br />
        <Link  to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Company</Link>
        <Link to="/admin/bcs/companies"  className="btn btn-danger btn-outline"><i className="fa fa-times"></i> Cancel</Link>
      </form>
      ) : (
         <SkeletonList /> 
      )
      }
      </>  
    </TabPane>
    <TabPane tab="Manage Relationships" key="2">
      
        { company && company.relationships ? 
          (
            <form onChange={(e)=>e.preventDefault()} className="form">
              <p className="lead">
                <i className="fa fa-briefcase"></i> {`Manage Relationships for ${company.name}.`}
              </p>
              <br />
              <Row justify="end" align="middle">    
              <Col flex="auto">
                      <CompaniesSelect 
                        value={cmpny} 
                        name={"cmpny"} 
                        onChange={ e =>onChange(e)}
                        filter={company.relationships}
                      />
                    </Col>
                    <Col className="text-center" flex="100px">
                      {cmpny ? (<Link onClick={e => addCmpny(e)} to="#" s className="btn btn-primary btn-outline"><i className="fa fa-briefcase"></i>Add</Link>) : (<Link onClick={e => e.preventDefault()} to="#" s className="btn btn-light btn-outline"><i className="fa fa-plus"></i>Add</Link>)}
                      
                    </Col>
                  </Row>
              <Relationships companies={company.relationships}/>
            </form>
          )
           : 
          (<h2>No Relationships</h2>)
        }
    </TabPane>
    <TabPane tab="All Buildings" key="3">
      <Divider>All Buildings</Divider>
    </TabPane>
  </Tabs>
</div>
  )
}

EditCompany.propTypes = {
  adminGetCompanies: PropTypes.func.isRequired,
  adminUpdateCompany: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  adminCompany: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
  adminCompany: state.adminCompany
})

export default connect(mapStateToProps,{adminGetCompanies, setAlert, adminUpdateCompany})(EditCompany)