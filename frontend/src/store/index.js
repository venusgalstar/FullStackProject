import { createStore } from 'redux'
import config from '../contract/config';
import { toast } from 'react-toastify';
import {globalWeb3, web3, purseManagerContract, purseManagerAddress} from '../contract/web3'

const _initialState = {
    account: "",
    contractBalance: 0,
    chainId: 0,
}

const init = (init) => {
    return init;
}

const reducer = (state = init(_initialState), action) => {

    if (action.type === "UPDATE_CHAIN_ID") {

        return Object.assign({}, state, {
            chainId: action.payload.chainId
        });

    } else if (action.type === 'CONNECT_WALLET') {

        if( checkNetwork(state.chainId) )
        {
            return Object.assign({}, state, {chainId:state.chainId});
        }

        web3.eth.getAccounts((err, accounts) => {
            store.dispatch({
                type: "GET_USER_INFO",
                payload: { account: accounts[0] }
            });          
        })

    } else if (action.type === "GET_USER_INFO") {

        let account = (action.payload !== undefined && action.payload.account !== undefined) ? action.payload.account : state.account;
        
        return Object.assign({}, state, {account:account});

    } else if (action.type === "RETURN_DATA") {

        return Object.assign({}, state, action.payload);

    } else if (action.type === "DEPOSIT_MONEY"){
        
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state);
        }

        purseManagerContract.methods.pay()
        .send({from:state.account, value: web3.utils.toWei(action.payload.value, 'ether')})
        .then(()=>{
            updateGlobalInfo();
        })
        .catch(()=>{

        });
        
    } else if (action.type === "WITHDRAW_MONEY"){
        
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state);
        }

        purseManagerContract.methods.withdraw()
        .send({from:state.account})
        .then(()=>{
            updateGlobalInfo();
        })
        .catch(()=>{

        });
        
    }
    return state;
}

const connectAlert = () => {
    toast.info("Please connect your wallet!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const checkNetwork = (chainId) => {
    if (web3.utils.toHex(chainId) !== web3.utils.toHex(config.chainId)) {
        toast.info("Change network to Rinkeby Chain!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return 1;
    }
    return 0;
}


const updateGlobalInfo = () => {
    let promise = [];
    promise.push(globalWeb3.eth.getBalance(purseManagerAddress));

    Promise.all(promise).then((result) => {
        store.dispatch({
            type: "RETURN_DATA",
            payload: {
                contractBalance: web3.utils.fromWei(result[0], 'ether')
            }
        });
    }).catch((e)=>{
        console.log("error :", e);
    }); 
}

const AlertMsg = (content) => {
    toast.error(content, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        store.dispatch({
            type: "GET_USER_INFO",
            payload: { account: accounts[0] }
        });
    })
    window.ethereum.on('chainChanged', function (chainId) {
        checkNetwork(chainId);
        store.dispatch({
            type: "UPDATE_CHAIN_ID",
            payload: { chainId: chainId }
        });
    });
    web3.eth.getChainId().then((chainId) => {
        checkNetwork(chainId);
        store.dispatch({
            type: "UPDATE_CHAIN_ID",
            payload: { chainId: chainId }
        });
    })
}

updateGlobalInfo();

const store = createStore(reducer);
export default store