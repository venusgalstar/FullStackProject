import React, { useCallback } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const ConnectButton = (props) => {

    const handleConnect = useCallback(async () => {
        if (window.ethereum) {
            await window.ethereum.enable();
            // await window.ethereum.send('eth_requestAccounts');
            props.dispatch({
                type: "CONNECT_WALLET"
            });
        } else {
            toast.info("Please install metamask on your device.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [props]);

    return <ul className="menu">
        <li className="menu__item menu__item_active">
            {
                !props.account
                    ? <a
                        href="#"
                        className={"connectWallet"}
                        onClick={(event) => {
                            event.preventDefault();
                            handleConnect();
                            return false;
                        }}
                    >
                        Connect Wallet
                    </a>
                    : <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "15px" }}>
                        <div className="c-green connected-account-text">{props.account.slice(0, 8) + "..." + props.account.slice(34)}</div>
                        <div className="connected-text">WALLET CONNECTED</div>
                    </div>
            }
        </li>
    </ul>
};

const mapStateToProps = state => {
    return {
        account: state.account
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectButton);