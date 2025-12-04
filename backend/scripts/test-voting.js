const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting test voting simulation...\n");

  // Get the deployed contract
  const contractAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = Voting.attach(contractAddress);

  console.log("📋 Contract deployed at:", contractAddress);
  
  // Get all candidates
  console.log("\n👥 Fetching candidates...");
  const candidates = await voting.getAllCandidates();
  
  console.log("\n📊 Current Candidates:");
  for (let i = 0; i < candidates.length; i++) {
    console.log(`   ${i + 1}. ${candidates[i].name} - ${candidates[i].voteCount} votes`);
  }

  // Get test accounts
  const [owner, voter1, voter2, voter3] = await hre.ethers.getSigners();
  
  console.log("\n🗳️  Simulating votes from test accounts...\n");
  
  // Vote from different accounts
  try {
    console.log("   Voter 1 voting for Mourad...");
    await voting.connect(voter1).vote(1);
    console.log("   ✅ Vote cast successfully!");
    
    console.log("   Voter 2 voting for Mohamed...");
    await voting.connect(voter2).vote(2);
    console.log("   ✅ Vote cast successfully!");
    
    console.log("   Voter 3 voting for Mourad...");
    await voting.connect(voter3).vote(1);
    console.log("   ✅ Vote cast successfully!");
  } catch (error) {
    console.log("   ⚠️  Some votes may have already been cast");
  }

  // Get updated results
  console.log("\n📊 Updated Vote Count:");
  const updatedCandidates = await voting.getAllCandidates();
  for (let i = 0; i < updatedCandidates.length; i++) {
    console.log(`   ${i + 1}. ${updatedCandidates[i].name} - ${updatedCandidates[i].voteCount} votes`);
  }

  // Check voter status
  console.log("\n👤 Voter Status:");
  console.log(`   Voter 1 has voted: ${await voting.voters(voter1.address)}`);
  console.log(`   Voter 2 has voted: ${await voting.voters(voter2.address)}`);
  console.log(`   Voter 3 has voted: ${await voting.voters(voter3.address)}`);

  console.log("\n✅ Test completed successfully!");
  console.log("🌐 Now open http://localhost:5173 and connect with MetaMask to vote!\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
