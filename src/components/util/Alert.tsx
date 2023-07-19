import React, {useEffect, useRef, useState} from 'react';

interface AlertProps {
    classes: string;
    message: string | null | undefined;
    onClick? (event: React.FormEvent<HTMLButtonElement>): void;
};

const Alert: React.FC<AlertProps> = (props: AlertProps) => {

    const {classes,message, onClick } = props;
    const [showAlert, setShowAlert] = useState(false);

    const onAlertClick = (event: React.FormEvent<HTMLButtonElement>) => {
        if(onClick) {
            onClick(event);
        }
        else {
            setShowAlert(false)
        }
    }

    useEffect(() => {
        if(message) {
            setShowAlert(true);
        }
    },[message]);


    return<>
        {showAlert && <div className={classes}>
            {message}
            <button type="button" className="btn-close" onClick={onAlertClick} aria-label="Close"></button>
        </div>}
    </>
}

export default Alert;