var account;

    // https://docs.walletconnect.com/quick-start/dapps/web3-provider
    var provider = new WalletConnectProvider.default({
      rpc: {
        1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
        137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
        // ...

      },
      // bridge: 'https://bridge.walletconnect.org',
    });

    var connectWC = async () => {
      await provider.enable();

      //  Create Web3 instance
      const web3 = new Web3(provider);
      window.w3 = web3

      var accounts  = await web3.eth.getAccounts(); // get all connected accounts
      account = accounts[0]; // get the primary account
    }


    var sign = async (msg) => {
      if (w3) {
        return await w3.eth.personal.sign(msg, account)
      } else {
        return false
      }

    }    

    async function sign(msg) {
      try {
        web3 = await sign('Sign This Message');
      } catch (error) {
        console.log('Not Signed', error);
      }
    }

    var contract = async (abi, address) => {
      if (w3) {
        return new w3.eth.Contract(abi, address)
      } else {
        return false
      }
    }

    var send = async () => {
      if (w3) {
        return await w3.eth.sendTransaction({ from: account, to: address, value: '10' })
      } else {
        return false
      }
    }

    var disconnect = async () => {
      // Close provider session
      await provider.disconnect()
    }


    var address = "0xa305c5ce308B21E40d025a4bb2fdcbd3AD216f9e"
    var abi = [{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
              "stateMutability":"view","type":"function"},{"inputs":[],"name":"increment","outputs":
              [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]
