import React from 'react';

interface ButtonsGroupProps {
    submitEvent? (event:  React.MouseEvent<HTMLButtonElement | MouseEvent> | undefined ): void;
    cancelEvent? (event:  React.MouseEvent<HTMLButtonElement | MouseEvent> | undefined ): void;

    submitText?: string;
    cancelText?: string;
}

const ButtonsGroup: React.FC<ButtonsGroupProps> = (props: ButtonsGroupProps) => {

    const {submitEvent, cancelEvent, submitText, cancelText} = props;

    const submitClickEvent = (event:  React.MouseEvent<HTMLButtonElement | MouseEvent> | undefined) => {
        if(submitEvent) {
            submitEvent(event);
        }
    };

    const cancelClickEvent = (event:  React.MouseEvent<HTMLButtonElement | MouseEvent> | undefined) => {
        if(cancelEvent) {
            cancelEvent(event);
        }
    }
    return (
        <div className="float-end">
            <button type="submit" onClick={ submitClickEvent  } className="btn btn-primary me-1">
                {submitText? submitText: 'Submit' }
            </button>
            <button type="submit" onClick={cancelClickEvent} className="btn btn-secondary">
                {cancelText? cancelText: 'Cancel' }
            </button>
        </div>
    );
}

export default ButtonsGroup;