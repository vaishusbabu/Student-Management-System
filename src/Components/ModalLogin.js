import React from 'react'
import './Modal.css'
function ModalLogin({ closeModal }) {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className='title'>
                    <div className="body">
                        Invalid Login
                    </div>
                </div>
                <div className='footer'>
                    <button className="btn btn-danger" onClick={() => closeModal(false)}>Close</button>
                </div>
            </div>



        </div>
    )
}

export default ModalLogin