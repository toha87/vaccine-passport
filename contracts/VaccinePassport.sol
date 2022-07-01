//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VaccinePassport {

    string private vaccineName;

    constructor(string memory _vaccineName) {
        console.log("Recording a vaccine:", _vaccineName);
        vaccineName = _vaccineName;
    }

    function getVaccineName() public view returns (string memory) {
        return vaccineName;
    }

    function setVaccineName(string memory _vaccineName) public {
        console.log("Changing vaccine name from '%s' to '%s'", vaccineName, _vaccineName);
        vaccineName = _vaccineName;
    }

}
