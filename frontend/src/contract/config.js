
var fireAbi = require('./abis/PurseManager.json');


var config = {
    main: {
        mainNetUrl: "https://rinkeby.infura.io/v3/57b59f4ada61437eb6c386afae37ec80",
        PurseManager : "0x0F735097B18C39Af7668fBf620f7EBa583baF80b",
        PurseManagerAbi: fireAbi,
        chainId: 0x4,
    },

    test: {
        mainNetUrl: "https://rinkeby.infura.io/v3/57b59f4ada61437eb6c386afae37ec80",
        PurseManager : "0x0F735097B18C39Af7668fBf620f7EBa583baF80b",
        PurseManagerAbi: fireAbi,
        chainId: 0x4,
    }
}


export default config.main;