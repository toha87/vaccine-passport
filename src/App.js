import React from 'react';
import Web3 from "web3";

function App() {

  const loadBlockchainData = async () => {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const networkId = await web3.eth.net.getNetworkType();
    console.log(networkId);
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
