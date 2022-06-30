import React, {useEffect, useState} from 'react';
import Web3 from "web3";
import {ethers} from "ethers";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

  const [message, setMessage] = useState("");

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
      setBalance((balance / 1e18).toFixed(4));
    }
  }

  const fetchGreeting = async () => {
    const greeter = new ethers.Contract(greeterAddress, Greeter.abi, web3.currentProvider);
    const greeting = await greeter.greet();
    setMessage(greeting);
  }

  const setGreeting = async () => {
    if (!message) return;

    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
    const transaction = await contract.setGreeting(message);

    setMessage("");
    await transaction.wait();
    await fetchGreeting();
  }

  return (
    <div className="App">
      <h1>Vaccine Passport</h1>
      <h3>Welcome to the blockchain powered web application</h3>
      <p>Your account is: {account}</p>
      <p>Your balance is: {balance}</p>
      <p>Your network is: {network}</p>
      <br/>
      <button onClick={fetchGreeting}>Get Greeting</button>
      <br/>
      <br/>
      <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Enter your greeting"/>
      <br/>
      <button onClick={setGreeting}>Set Greeting
      </button>
    </div>
  );
}

export default App;
