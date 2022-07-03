const hre = require('hardhat');
const fs = require('fs');

/**
 * main func
 */
async function main() {
  console.log('Deploying: Pipele...');

  const deployer = await hre.ethers.getSigner();
  const deployerAddress = await deployer.getAddress();
  // contract 
  const Pipele = await hre.ethers.getContractFactory('Pipele');
  const pipele = await Pipele.deploy(hre.ethers.utils.parseEther('0.001'));

  await pipele.deployed();

  const pipeleArtifact = await hre.artifacts.readArtifact('Pipele');
  const NFTArtifact = await hre.artifacts.readArtifact('MintNFT');

  fs.writeFileSync(
    './build/abi.json',
    JSON.stringify({ pipele: pipeleArtifact.abi, mintNFT: NFTArtifact.abi })
  );

  fs.writeFileSync('./build/address.json', JSON.stringify({ pipele: pipele.address }));

  console.log('Artifacts saved to: /artifacts AND /client/src/contracts');

  console.log('Pipele deployed to:', pipele.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
