import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./styles.scss";
import { CSSTransition } from 'react-transition-group';

export const Header = (props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    return <>
        <div className={"header-main-btn-container"}>
            { props.mobileBtn }
        </div>
        <section id="page-header" className="page-header section section_wide">
            <div className={"page-header__inner"}>
                <CSSTransition in={mounted} timeout={0} classNames="fade">
                    <h6 className="page-header__slogan">
                        { props.slogan }
                    </h6>
                </CSSTransition>
                <CSSTransition in={mounted} timeout={500} classNames="fade">
                    <h1 className="page-header__title" style={{ margin: 0 }}>
                        { props.title }
                    </h1>
                </CSSTransition>
            </div>
        </section>
    </>
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    slogan: PropTypes.string,
    mobileBtn: PropTypes.element
}

export default Header;