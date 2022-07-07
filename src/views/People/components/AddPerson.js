import {useState} from "react";
import {Button, Input, Alert, Spinner} from "reactstrap";
import {v4 as uuidv4} from 'uuid';
import React from "@types/react";

const AddPerson = (props) => {

  const [id, setId] = useState(uuidv4());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

    const [isLoading, setIsLoading] = useState(false);

  const disabled = !id || !firstName || !lastName || !dateOfBirth;

  const addPerson = async () => {

    setIsLoading(true);

  }

  return (
    <div>
      <h1>Add Person</h1>
      <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID"/>
      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
      <Input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Date of Birth"/>
      <Button disabled={disabled} onClick={() => addPerson()}>Add Person</Button>
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
  )

}

export default AddPerson;