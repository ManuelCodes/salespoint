import React, {useEffect, useRef} from 'react';

interface ModalProps {
    showModal: boolean;
    text: string;
    primaryButtonClickEvent (event:  React.MouseEvent<HTMLButtonElement> ): void;
    primaryButtonText: string;
    secondaryButtonClickEvent (event:  React.MouseEvent<HTMLButtonElement> ): void;
    secondaryButtonText: string;
    closeIconClickEvent? (event:  React.MouseEvent<HTMLButtonElement> ): void;
    title?: string;
}


const Modal = (props: ModalProps) => {

    const {
        showModal,
        text,
        primaryButtonClickEvent,
        primaryButtonText,
        secondaryButtonClickEvent,
        secondaryButtonText,
        closeIconClickEvent,
        title
    }  = props;
    const showModalButton      = useRef<HTMLButtonElement>(null);
    const closeModalButton     = useRef<HTMLButtonElement>(null);
    const closeModalButtonIcon = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(showModalButton.current && showModal)  {
            showModalButton.current.click();
        }
        return () => {
            if(closeModalButton.current) {
                closeModalButton.current.click();
            }
        }
    },[showModal]);

    return (
        <div className="modal modal-fade" id="modal" data-bs-backdrop="static"  tabIndex={-1}  aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {
                            title && <h5 className="modal-title" id="modalLabel">{title}</h5>
                        }
                        {closeIconClickEvent &&
                            <button type="button" ref={closeModalButtonIcon} onClick={closeIconClickEvent} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        }
                    </div>
                    <div className="modal-body">
                        {text}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={primaryButtonClickEvent} className="btn btn-primary me-1" data-bs-target="#modal" >{primaryButtonText}</button>
                        <button type="button" className="btn btn-secondary" onClick={secondaryButtonClickEvent} >{secondaryButtonText}</button>

                        {/* hidden buttons to open/close modal */}
                        <button type="button" ref={showModalButton}  className="btn btn-primary me-1" data-bs-toggle="modal"  data-bs-target="#modal" style={{display: 'none'}} >Submit</button>
                        <button type="button" ref={closeModalButton} className="btn btn-secondary" data-bs-dismiss="modal" style={{display: 'none'}} >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;