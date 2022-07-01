const hre = require("hardhat");

async function main() {

  const VaccinePassport = await hre.ethers.getContractFactory("VaccinePassport");
  const vaccinePassport = await VaccinePassport.deploy("Covid-19");

  await vaccinePassport.deployed();

  console.log("Greeter deployed to:", vaccinePassport.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
