import React, { useState} from 'react'
// import React from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ScaleLoader from 'react-spinners/ScaleLoader'
import { css } from '@emotion/core'
const override = css`
  margin-left: 1rem;
`


const DeleteButton = ( {confirmDelete, itemName='item' } ) => {
  const [isDeleting, setIsDeleting] = useState(false)
  

  const confirmFunction = async () => {
    await confirmDelete()
    setIsDeleting(false)
  }
  const activateFunc = (e) => {
    e.preventDefault()
    setIsDeleting(true)
    confirmAlert(options)
  }
  const handleStop = () => {
    setIsDeleting(false)
  }


  const options = {
    afterClose: handleStop,
    closeOnEscape: true,
    closeOnClickOutside : true,
    customUI: ({ onClose }) => {
      return (
        <div className="react__alert">
          <h1 className="react__alert__title">Delete {itemName.toLowerCase().charAt(0).toUpperCase() + itemName.slice(1)}?</h1>
          <p className="react__alert__body">Are you sure you want to delete this {itemName.toLowerCase()}?</p>
          <button onClick={onClose} className="btn btn-primary">Cancel</button>
          <button
            onClick={() => {
              confirmFunction();
              onClose();
            }}
            className="danger"
          >
            Yes, Delete it!
          </button>
        </div>
      );
    }
  }

  return ( 
     isDeleting ? 
     <ScaleLoader color={'#37bc9b'} loading={true} css={override} height={20} width={4} radius={2} margin={2} />
    : 
    <Link 
      to="#"
      className="btn btn-danger btn-outline" 
      title="Delete" 
      onClick={(e)=> activateFunc(e)}
    >
      <i 
        title="Delete" 
        className="fa fa-trash"
      ></i> Delete
    </Link>
  )
}
 
export default DeleteButton
  