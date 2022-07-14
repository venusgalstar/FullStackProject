import Web3 from 'web3';
import config from '../contract/config';

const globalWeb3 = new Web3(config.mainNetUrl);
const gPurseManagerContract = new globalWeb3.eth.Contract(config.PurseManagerAbi, config.PurseManager);

const provider = Web3.providers.HttpProvider(config.testNetUrl);
const web3 = new Web3(Web3.givenProvider || provider);
const purseManagerContract = new web3.eth.Contract(config.PurseManagerAbi, config.PurseManager);
const purseManagerAddress = config.PurseManager;

export {globalWeb3, gPurseManagerContract, provider, web3, purseManagerContract, purseManagerAddress}