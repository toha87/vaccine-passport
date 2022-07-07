import React, {useState} from 'react';
import {ethers} from "ethers";
import VaccinePassport from './VaccinePassport.json';
import {Button, Input, Alert, Spinner} from 'reactstrap';
import VaccineImage from './vaccine.png';
import PersonDetails from "./views/People/components/PersonDetails";

const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

/**
 * @description This is the main component of the application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [personId, setPersonId] = useState("");
  const [person, setPerson] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // const requestAccounts = async () => {
  //   await window?.ethereum?.request({method: "eth_requestAccounts"});
  // }

  // /**
  //  * Fetches the latest vaccine name from the smart contract.
  //  */
  // const fetchVaccineName = async () => {
  //
  //   if (typeof window?.ethereum !== "undefined") {
  //     setIsLoading(true);
  //
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const contract = new ethers.Contract(contractAddress, VaccinePassport.abi, provider);
  //
  //     try {
  //       const data = await contract.getVaccineName();
  //
  //       console.log(data);
  //
  //       setVaccineName(data);
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // }
  //
  // /**
  //  * Sets the new vaccine name on the smart contract.
  //  */
  // const updateVaccineName = async () => {
  //   if (!vaccineName) return;
  //
  //   if (typeof window?.ethereum !== "undefined") {
  //
  //     try {
  //
  //       setIsLoading(true);
  //
  //       await requestAccounts();
  //
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //
  //       const contract = new ethers.Contract(contractAddress, VaccinePassport.abi, signer);
  //       const transaction = await contract.setVaccineName(vaccineName);
  //
  //       setVaccineName("");
  //       await transaction.wait();
  //       await fetchVaccineName();
  //
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //
  //   }
  // }

  const getPerson = async () => {

  }

  return (
    <div className="App" style={{position: 'absolute', textAlign: "center", left: "35%", top: "20%", width: "30vw"}}>
      <img src={VaccineImage} alt="car"/>
      <h1>Vaccine Passport</h1>
      <p>Welcome to the blockchain powered web application</p>
      <Input
        value={personId}
        style={{marginTop: "2em", marginBottom: "2em"}}
        onChange={(e) => setPersonId(e.target.value)}
        placeholder="Person ID"
      />
      <Button color="primary" onClick={() => getPerson()}>Search</Button>
      {
        person && !isLoading && <PersonDetails person={person}/>
      }
    </div>
  );
}

export default App;
