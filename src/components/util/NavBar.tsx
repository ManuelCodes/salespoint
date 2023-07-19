import React from 'react';
import DropDownItem from './DropDownItem';

const Navbar: React.FC = () => {

    const NavBarItemDivider = (): JSX.Element => {
        return <li><hr className="dropdown-divider"></hr></li>;
    }

    return (
        <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Start
                        </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <DropDownItem to='/sales' title='Sales' />
                        <DropDownItem to='/clients' title='Clients' />
                        <DropDownItem to='/saleitems' title='Sale Items' />
                        <DropDownItem to='/' jsxElement={NavBarItemDivider()} />
                        <DropDownItem to='/' title='Settings' />
                    </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Navbar;