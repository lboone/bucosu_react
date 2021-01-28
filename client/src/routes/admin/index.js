import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import Admin from '../../components/admin/Admin'
import Menus from '../../components/admin/Menus'
import Headings from '../../components/admin/Headings'
import Purposes from '../../components/admin/Purposes'
import Statuses from '../../components/admin/Statuses'
import Types from '../../components/admin/Types'
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
        path="/admin/headings" 
        component={Headings} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/purposes" 
        component={Purposes} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/statuses" 
        component={Statuses} 
        companyLevel={ COMPANY.ADMIN } 
        userLevel={ USER.SUPERADMIN }
      />
      <PrivateRoute 
        exact 
        path="/admin/types" 
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
