import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import Admin from '../../components/admin/Admin'
import Menus from '../../components/admin/Menus'
import Bcs from '../../components/admin/bcs/Bcs'
import Agreements from '../../components/admin/bcs/Agreements'
import Companies from '../../components/admin/bcs/Companies'
import AddCompany from '../../components/admin/bcs/companies/AddCompanyContainer'
import Buildings from '../../components/admin/bcs/Buildings'
import CompanyTypes from '../../components/admin/bcs/CompanyTypes'
import Headings from '../../components/admin/bcs/Headings'
import Profiles from '../../components/admin/bcs/Profiles'
import Questions from '../../components/admin/bcs/Questions'
import Projects from '../../components/admin/projects/Projects'
import Purposes from '../../components/admin/projects/Purposes'
import Statuses from '../../components/admin/projects/Statuses'
import Types from '../../components/admin/projects/Types'
import UserData from '../../components/admin/UserData'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function AdminRoutes (){
  return (
    <Fragment>
      <Switch>
      <PrivateRoute 
        exact 
        path="/admin" 
        component={Admin} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/menus" 
        component={Menus} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs" 
        component={Bcs} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/agreements" 
        component={Agreements} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/companies" 
        component={Companies} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/companies/addcompany" 
        component={AddCompany} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/buildings" 
        component={Buildings} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/companytypes" 
        component={CompanyTypes} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/headings" 
        component={Headings} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/profiles" 
        component={Profiles} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/bcs/questions" 
        component={Questions} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects" 
        component={Projects} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects/purposes" 
        component={Purposes} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects/statuses" 
        component={Statuses} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/projects/types" 
        component={Types} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/userdata" 
        component={UserData} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      </Switch>
      </Fragment>
      
  )
} 
