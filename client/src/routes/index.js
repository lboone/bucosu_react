import React, {useState, useEffect} from 'react'
import {
  useLocation
} from 'react-router-dom';
import queryString from 'query-string'

import AdminRoutes from './admin'
import AuthorizedRoutes from './authorized'
import BcsRoutes from './bcs'
import DashboardRoutes from './dashboard'
import ProjectsRoutes from './projects'
import UserRoutes from './user'

import {URLContext} from '../URLContext'

export default function AllRoutes (){
  const [params, setParams] = useState(null)
  const loc = useLocation()
  useEffect(()=>{    
    setParams(queryString.parse(loc.search))
  },[loc])
  
  const action = params && params.action ? params.action : null
  const id = params && params.id ? params.id : null 
  return (
    <URLContext.Provider value={{action, id, params}}>
      <AdminRoutes />
      <AuthorizedRoutes />
      <BcsRoutes />
      <DashboardRoutes />
      <ProjectsRoutes />
      <UserRoutes />
    </URLContext.Provider>
  )
}








 