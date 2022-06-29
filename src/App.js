import React, {useEffect, useState} from 'react';
import Web3 from "web3";

/**
 * @description This is the main component of the application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [account, setAccount] = useState(null);

  useEffect(() => {
    loadBlockchainData()
  }, []);

  /**
   * Loads blockchain data and sets the state of the component.
   */
  const loadBlockchainData = async () => {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    const accounts = await web3.eth.requestAccounts();
    /**
     * Set the account to the first account in the list.
     */
    setAccount(accounts[0]);
  }

  return (
    <div className="App">
      Your account is: {account}
    </div>
  );
}

export default App;
