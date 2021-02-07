import React from 'react'
import {Skeleton } from 'antd'



const SkeletonList = ( {active = true, avatar=true, loading=true, round=false, title=true, rows=5, paragraphs=2} ) => {
  const pars = []
  for (let index = 0; index < paragraphs; index++) {
    pars.push( 
      <Skeleton
        key={index}
        active = {active}
        loading = {loading}
        avatar = {avatar}
        round = {round}
        title = {title}
        paragraph={{ rows }} 
      />
    )  
  }
  return (pars )
}
  
export default SkeletonList
  