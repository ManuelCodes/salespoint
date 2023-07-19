import React, {useEffect, useRef} from 'react';

interface SpinnerModalProps {
    showModal: boolean;
}


const SpinnerModal = (props: SpinnerModalProps) => {

    const { showModal }  = props;
    const showModalButton  = useRef<HTMLButtonElement>(null);
    const closeModalButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(showModalButton.current && showModal)  {
            showModalButton.current.click();
        }
        return () => {
            if(closeModalButton.current) {
                closeModalButton.current.click();
            }
        }
    })

    return (
        <div className="modal modal-fullscreen" id="exampleModal" data-bs-backdrop="static"  tabIndex={-1}  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-body">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <button type="button" ref={showModalButton} className="btn btn-primary me-1" data-bs-toggle="modal"  data-bs-target="#exampleModal" style={{display: 'none'}} >Submit</button>
                    <button type="button" ref={closeModalButton} className="btn btn-secondary" data-bs-dismiss="modal" style={{display: 'none'}} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default SpinnerModal;