require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");
console.log("process.env.ACCOUNT_PRIVATE_KEY :",process.env.ACCOUNT_PRIVATE_KEY);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    zkEVM: {
    url: `https://rpc.cardona.zkevm-rpc.com`,
    accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    baseSepolia: {
      url: "https://sepolia.base.org", 
      accounts: [process.env.ACCOUNT_PRIVATE_KEY], 
    },
},
};
