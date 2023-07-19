import React from 'react';

interface ResponsiveButtonInterface  {
    buttonClass: string;
    onClick(event: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement, MouseEvent> ): void;
    buttonText: string;
    icon: string;
}

const ResponsiveButton = (props: ResponsiveButtonInterface) => {
    const { buttonClass, onClick, buttonText, icon  } = props;

    const classButton = `${buttonClass} float-end d-none d-md-block`;
    //bi-plus-square-fill
    const iconClass = `${icon} float-end d-block d-md-none`;

    return ( <>
        <button type="button" onClick={onClick} className={classButton} >
            {buttonText}
        </button>
        <i className={iconClass} onClick={onClick}  ></i>
    </>);
}

export default ResponsiveButton;

/** */