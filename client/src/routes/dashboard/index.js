import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import Dashboard from '../../components/dashboard/Dashboard'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function DashboardRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/dashboard/home" 
          component={Dashboard} 
          companyLevel={ COMPANY.SCHOOLDISTRICT } 
          userLevel={ USER.READER }
        />
      </Switch>
    </Fragment>
      
  )
} 
