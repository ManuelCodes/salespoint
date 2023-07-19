import React from 'react';
import {
    Link
  } from "react-router-dom";

interface DropDownItemProps  {
    title?: string;
    jsxElement?: JSX.Element;
    to: string;
};
<Link to="/">Home</Link>
const DropDownItem = (props: DropDownItemProps) => {
    const {title,to, jsxElement} = props;
    return <div>
        { title && <li><Link className="dropdown-item" to={to}>{title}</Link>  </li> }
        { jsxElement }
    </div>;
}

export default DropDownItem;