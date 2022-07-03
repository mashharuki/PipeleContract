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
  const MintNFT = await hre.ethers.getContractFactory('MintNFT');
  const mintNFT = await MintNFT.deploy();

  await mintNFT.deployed();

  // const pipeleArtifact = await hre.artifacts.readArtifact('Pipele');
  const NFTArtifact = await hre.artifacts.readArtifact('MintNFT');

  fs.writeFileSync(
    './build/abi3.json',
    JSON.stringify({mintNFT: NFTArtifact.abi })
  );

  // fs.writeFileSync('./build/address3.json', JSON.stringify({ pipele: pipele.address }));

  // console.log('Artifacts saved to: /artifacts AND /client/src/contracts');

  console.log('MintNFT deployed to:', mintNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
