// Import the Hardhat Runtime Environment explicitly. This step is optional,
// but it's useful when running the script independently using `node <script>`.
//
// Alternatively, you can execute the script with `npx hardhat run <script>`.
// When doing so, Hardhat will compile your contracts, add the members of
// the Hardhat Runtime Environment to the global scope, and execute the script.

const hardhatRuntime = require("hardhat");

async function deployContract() {
  const initialBalance = 1;
  const AssessmentContract = await hardhatRuntime.ethers.getContractFactory(
    "Assessment"
  );
  const deployedContract = await AssessmentContract.deploy(initialBalance);
  await deployedContract.deployed();

  console.log(
    `Contract deployed with an initial balance of ${initialBalance} ETH to ${deployedContract.address}`
  );
}

// Following this pattern allows us to use async/await universally
// and handle errors appropriately.
deployContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
