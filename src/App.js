import React, {useState} from 'react';
import {ethers} from "ethers";
import VaccinePassport from './artifacts/contracts/VaccinePassport.sol/VaccinePassport.json';

const greeterAddress = "0x3530C1db973F93Fd93e61D4547485C0e3A236f32";

/**
 * @description This is the main component of the application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [vaccineName, setVaccineName] = useState("");

  const requestAccounts = async () => {
    await window?.ethereum?.request({method: "eth_requestAccounts"});
  }

  /**
   * Fetches the latest vaccine name from the smart contract.
   */
  const fetchVaccineName = async () => {

    if (typeof window?.ethereum !== "undefined") {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, VaccinePassport.abi, provider);

      try {
        const data = await contract.getVaccineName();

        console.log(data);

        setVaccineName(data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Sets the new vaccine name on the smart contract.
   */
  const updateVaccineName = async () => {
    if (!vaccineName) return;

    if (typeof window?.ethereum !== "undefined") {
      await requestAccounts();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(greeterAddress, VaccinePassport.abi, signer);
      const transaction = await contract.setVaccineName(vaccineName);

      setVaccineName("");
      await transaction.wait();
      await fetchVaccineName();
    }
  }

  return (
    <div className="App" style={{textAlign: 'center'}}>
      <h1>Vaccine Passport</h1>
      <h3>Welcome to the blockchain powered web application</h3>
      <br/>
      <button onClick={fetchVaccineName}>Get Vaccine Name</button>
      <br/>
      {
        vaccineName && <h4>Latest Vaccine Name: {vaccineName}</h4>
      }
      <br/>
      <input
        type="text"
        value={vaccineName}
        onChange={(event) => setVaccineName(event.target.value)}
        placeholder="Enter your vaccine name"
      />
      <br/>
      <button onClick={updateVaccineName}>Set Vaccine Name</button>
    </div>
  );
}

export default App;
