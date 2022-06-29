import React, {useEffect, useState} from 'react';
import Web3 from "web3";

/**
 * @description This is the main component of the application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [web3, setWeb3] = useState(null);

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    setWeb3(web3);
  }, []);

  useEffect(() => {
    if (web3) {
      loadBlockchainData();
      loadBalance();
    }
  }, [web3, account]);

  /**
   * Loads blockchain data and sets the state of the component.
   */
  const loadBlockchainData = async () => {

    const accounts = await web3?.eth?.requestAccounts();
    /**
     * Set the account to the first account in the list.
     */
    setAccount(accounts[0]);
  }

  /**
   * Loads the balance of the account and sets the state of the component.
   */
  const loadBalance = async () => {

    const network = await web3?.eth?.net?.getNetworkType();

    if (network) {
      setNetwork(network);
    }

    if (account) {
      const balance = await web3?.eth?.getBalance(account);
      setBalance(balance);
    }
  }

  return (
    <div className="App">
      <h1>Vaccine Passport</h1>
      <h3>Welcome to the blockchain powered web application</h3>
      <p>Your account is: {account}</p>
      <p>Your balance is: {balance}</p>
      <p>Your network is: {network}</p>
    </div>
  );
}

export default App;
