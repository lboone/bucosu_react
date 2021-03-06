import React, { useEffect, useState} from 'react'
// import React from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ScaleLoader from 'react-spinners/ScaleLoader'
import { css } from '@emotion/core'
const override = css`
  margin-left: 1rem;
`


const DeleteButton = ( {confirmDelete, itemName='item', title="Delete", buttonIcon="trash", buttonClass="danger" } ) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("")
  useEffect(() => {setButtonTitle(title) }, [title])
  

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
          <h1 className="react__alert__title">{buttonTitle} {itemName.toLowerCase().charAt(0).toUpperCase() + itemName.slice(1)}?</h1>
          <p className="react__alert__body">Are you sure you want to {buttonTitle.toLowerCase()} this {itemName.toLowerCase()}?</p>
          <button onClick={onClose} className="btn btn-primary">Cancel</button>
          <button
            onClick={() => {
              confirmFunction();
              onClose();
            }}
            className="danger"
          >
            Yes, {buttonTitle} it!
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
      className={`btn btn-${buttonClass} btn-outline`}
      title={buttonTitle} 
      onClick={(e)=> activateFunc(e)}
    >
      <i 
        title={buttonTitle} 
        className={`fa fa-${buttonIcon}`}
      ></i> {buttonTitle}
    </Link>
  )
}
 
export default DeleteButton
  