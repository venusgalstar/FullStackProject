import React from "react";

import Content from "../../components/admin/content";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import ConnectButton from "../../components/ConnectButton";
import './styles.scss';


class Admin extends React.Component {

    render() {
        return (
            <>
                <Navigation menu={<ConnectButton/>}/>
                <Header title="Frontend for Torre CTO"/>
                <Content />
            </>
        );
    }
}


export default Admin;