import React from 'react'
import {formatDate} from '../../../../utils/globalFunctions'

const DisplayDate = ({origDate, format='MM/DD/YYYY'}) => {
  return (
    <>
      {origDate && formatDate(origDate,format)}
    </>
  )
}

export default DisplayDate
