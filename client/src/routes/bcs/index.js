import React, {Fragment } from 'react'
import {
  Switch
} from 'react-router-dom';
import PrivateRoute from '../../components/routing/PrivateRoute'

import Bcs from '../../components/bcs/Bcs'
import Events from '../../components/bcs/Events'
import Reports from '../../components/bcs/Reports'
import Help from '../../components/bcs/Help'
import { ACCESSTYPES } from '../../utils/constants'
const { COMPANY, USER } = ACCESSTYPES

export default function BcsRoutes (){
  return (
    <Fragment>
      <Switch>
        <PrivateRoute 
          exact 
          path="/bcs/home" 
          component={Bcs} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.READER}
        />
        <PrivateRoute 
          exact 
          path="/bcs/events/home" 
          component={Events} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.AUTHOR}
        />
        <PrivateRoute 
          exact 
          path="/bcs/reports/home" 
          component={Reports} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.READER}
        />
        <PrivateRoute 
          exact 
          path="/bcs/help/home" 
          component={Help} 
          companyLevel={COMPANY.SCHOOLDISTRICT}
          userLevel={USER.AUTHOR}
        />
      </Switch>
    </Fragment>   
  )
} 
