import React, { createContext, useState, useEffect } from 'react'
import { gRewardContract } from '../contract/web3'
import constants from '../constants'
import Web3 from 'web3'

const ContractNumbers = createContext()

function ContractContext({ children }) {
  const [costs, setCosts] = useState({ nestMaintenance: 0, nestClaim: 0, nestRewardRate: constants.rewardRate, nestMaintInt: constants.nestMaintInterval, masterNFTCost: 0, grandMasterNFTCost: 0 })

  const getValues = async () => {
    const nestMaintenance = Web3.utils.fromWei(await gRewardContract.methods.getNodeMaintenanceFee().call(), 'ether')
    const nestClaim = Web3.utils.fromWei(await gRewardContract.methods.getClaimFee().call(), 'ether')
    const masterNFTCost = Web3.utils.fromWei(await gRewardContract.methods.getMasterNFTPrice().call(), 'ether')
    const grandMasterNFTCost = Web3.utils.fromWei(await gRewardContract.methods.getGrandNFTPrice().call(), 'ether')
    setCosts(prev => ({ ...prev, nestMaintenance, nestClaim, masterNFTCost, grandMasterNFTCost }))
  }


  useEffect(() => {
    getValues()
  }, [])



  return (
    <ContractNumbers.Provider value={costs}>
      {children}
    </ContractNumbers.Provider>
  )
}

export { ContractContext, ContractNumbers }

//"getClaimFee","getNodeMaintenanceFee","getMasterNFTPrice","getGrandNFTPrice",