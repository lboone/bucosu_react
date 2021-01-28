import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import Authorized from '../../components/authorized/Authorized'
import Users from '../../components/authorized/Users'
import Register from '../../components/authorized/Register'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function AuthorizedRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/authorized" 
          component={Authorized} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.ADMIN}
        />
        <PrivateRoute 
          exact 
          path="/authorized/users" 
          component={Users} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.ADMIN}
        />
        <PrivateRoute 
          exact 
          path="/authorized/register" 
          component={Register} 
          companyLevel={ COMPANY.SCHOOLDISTRICT } 
          userLevel={ USER.ADMIN }
        />
      </Switch>
    </Fragment>   
  )
} 
