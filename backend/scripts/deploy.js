const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  console.log("Voting contract deployed to:", await voting.getAddress());

  // Add some candidates
  await voting.addCandidate("Mourad");
  await voting.addCandidate("Mohamed");
  await voting.addCandidate("Salim");
  await voting.addCandidate("Ahmed");
  await voting.addCandidate("Kais");

  console.log("Candidates added: Mourad, Mohamed, Salim, Ahmed, Kais");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
