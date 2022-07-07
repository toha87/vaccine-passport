//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VaccinePassport {

    // Person is the owner of a passport.
    struct Person {
        uint8 id;
        string firstName;
        string lastName;
        string dob;
        Vaccine[] vaccines;
    }

    // List of all people registered in the system.
    Person[] private people;

    // Add a new vaccine to the passport.
    struct Vaccine {
        uint8 id;
        string name;
        string date;
        string location;
        string notes;
    }

    Vaccine[] private vaccines;

    function addPerson(string memory _firstName, string memory _lastName, string memory _dob) public {
        console.log("Adding a person:", _firstName, _lastName, _dob);
        Person person;
        person.id = people.length;
        person.firstName = _firstName;
        person.lastName = _lastName;
        person.dob = _dob;
        people.push(person);
    }

    function addVaccine(string memory _name, string memory _date, string memory _location, string memory _notes, uint8 memory _id) public {
        console.log("Adding a vaccine:", _name, _date, _location, _notes);
        Vaccine vaccine;
        vaccine.id = people.length;
        vaccine.name = _name;
        vaccine.date = _date;
        vaccine.location = _location;
        vaccine.notes = _notes;
        people[_id].vaccines.push(vaccine);
    }

    function getPerson(uint8 _id) public view returns (Person memory person) {
        person = people[_id];
    }

    function getVaccine(uint8 _id) public view returns (Vaccine memory vaccine) {
        vaccine = vaccines[_id];
    }

}
