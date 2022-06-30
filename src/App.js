import React, {useState} from 'react';
import {ethers} from "ethers";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

/**
 * @description This is the main component of the application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [message, setMessage] = useState("");

  const requestAccounts = async () => {
    await window?.ethereum?.request({method: "eth_requestAccounts"});
  }

  /**
   * Fetches the message from the smart contract.
   */
  const fetchGreeting = async () => {

    if (typeof window?.ethereum !== "undefined") {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();

        console.log(data);

        setMessage(data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Sets the message on the smart contract.
   */
  const setGreeting = async () => {
    if (!message) return;

    if (typeof window?.ethereum !== "undefined") {
      await requestAccounts();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message);

      setMessage("");
      await transaction.wait();
      await fetchGreeting();
    }
  }

  return (
    <div className="App">
      <h1>Vaccine Passport</h1>
      <h3>Welcome to the blockchain powered web application</h3>
      <br/>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <br/>
      <br/>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter your greeting"
      />
      <br/>
      <button onClick={setGreeting}>Set Greeting
      </button>
    </div>
  );
}

export default App;
