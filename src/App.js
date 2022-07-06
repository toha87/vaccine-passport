import React, {useState} from 'react';
import {ethers} from "ethers";
import VaccinePassport from './VaccinePassport.json';
import {Button, Input, Alert, Spinner} from 'reactstrap';
import VaccineImage from './vaccine.png';

const contractAddress = "0x3530C1db973F93Fd93e61D4547485C0e3A236f32";

/**
 * @description This is the main component of the application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [vaccineName, setVaccineName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestAccounts = async () => {
    await window?.ethereum?.request({method: "eth_requestAccounts"});
  }

  /**
   * Fetches the latest vaccine name from the smart contract.
   */
  const fetchVaccineName = async () => {

    if (typeof window?.ethereum !== "undefined") {
      setIsLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, VaccinePassport.abi, provider);

      try {
        const data = await contract.getVaccineName();

        console.log(data);

        setVaccineName(data);
        setIsLoading(false);
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

      try {

        setIsLoading(true);

        await requestAccounts();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, VaccinePassport.abi, signer);
        const transaction = await contract.setVaccineName(vaccineName);

        setVaccineName("");
        await transaction.wait();
        await fetchVaccineName();

      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }

    }
  }

  return (
    <div className="App" style={{position: 'absolute', textAlign: "center", left: "40%", top: "20%", width: "30vw"}}>
      <img
        src={VaccineImage}
        alt="car"
      />
      <h1>Vaccine Passport</h1>
      <p>Welcome to the blockchain powered web application</p>
      <br/>
      {
        vaccineName &&
        <Alert
          color="primary"
        >
          <p>Latest Vaccine Name Saved on Blockchain: <strong>{vaccineName}</strong></p>
        </Alert>
      }
      <Button color="primary" onClick={fetchVaccineName}>Get Vaccine Name</Button>
      <br/>

      <br/>
      <Input
        type="text"
        value={vaccineName}
        onChange={(event) => setVaccineName(event.target.value)}
        placeholder="Enter your vaccine name"
      />
      <br/>
      <Button color="success" onClick={updateVaccineName}>Save to Blockchain</Button>
      <div style={{marginTop: "3em"}}>
        {
          isLoading &&
          <Spinner
            color="primary"
            type="grow"
            size="lg"
          >
            Loading...
          </Spinner>
        }
      </div>

    </div>
  );
}

export default App;
