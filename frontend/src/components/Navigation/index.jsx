import React, { useEffect } from "react";
import logo from '../../assets/images/logo.png';

import PropTypes from "prop-types";

import './styles.scss';

export const Navigation = (props) => {
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector('.navigation_fixed');
        const scrollTop = window.scrollY;
        scrollTop >= 150
            ? header.classList.add('navigation_sticky')
            : header.classList.remove('navigation_sticky');
    };

    return <nav className={"navigation navigation_fixed".concat(props.hideOnMobileNavigation ? " hide-navigation" : "")}>
        <div className="navigation__inner">
            <div className="navigation__logo">
                <a href="/"><img src={logo} height={115} alt={"Logo"}/></a>
            </div>
            <div className="navigation__menu">
                { props.menu }
            </div>
        </div>
    </nav>
}

Navigation.propTypes = {
    menu: PropTypes.element,
    hideOnMobileNavigation: PropTypes.element
}

export default Navigation;
