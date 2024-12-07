import os from 'os'
const { Coinbase, Wallet } = require("@coinbase/coinbase-sdk");
// const path = require("path");

// const filePath = path.join(os.homedir(), "Downloads", "cdp_api_key.json");
const coinbase = Coinbase.configureFromJson({ filePath: `${os.homedir()}/Downloads/cdp_api_key.json`, useServerSigner: true});
const contractJson = require("../contracts/HouseRent.json");
const contractABI = contractJson.abi;
console.log("process.env.CONTRACT_ADDRESS :", process.env.CONTRACT_ADDRESS);
const contractAddress = "0x2a6A9c8D95d98EeA7985e959AAAB12e814678706"
require("dotenv");

export const createAgreement = async (
  contract,
  ownerAddress,
  tenantAddress,
  securityDeposit,
  monthlyRent,
  tenureInMonths
) => {
  if (
    !contract ||
    !ownerAddress ||
    !tenantAddress ||
    !securityDeposit ||
    !monthlyRent ||
    !tenureInMonths
  ) {
    alert("Please Fill all the details ");
    return null;
  }
  const wallet = await Wallet.create({
    networkId: Coinbase.networks.BaseSepolia,
  });

  const transferFromArgs = {
    ownerAddress,
    tenantAddress,
    securityDeposit,
    monthlyRent,
    tenureInMonths,
  };

  const contractInvocation = await wallet.invokeContract({
    contractAddress: contractAddress,
    method: "createAgreement",
    args: transferFromArgs,
    abi:contractABI,
  });
  await contractInvocation.wait();
};

const depositSecuirty = async (
    contract,
    account,
    ownerAddress,
    tenantAddress,
    securityDeposit,
    agreementId
  ) => {
    if (
      !contract ||
      !account ||
      !ownerAddress ||
      !tenantAddress ||
      !agreementId ||
      !securityDeposit
    ){
      alert("Please Fill all the details ");
      return null;
    }
    const wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseSepolia,
      });
    
      const transferFromArgs = {
        ownerAddress,
        tenantAddress,
        securityDeposit,
        agreementId
      };
    
      const contractInvocation = await wallet.invokeContract({
        contractAddress: contractAddress,
        method: "depositSecuirty",
        args: transferFromArgs,
        abi:contractABI,
      });
      await contractInvocation.wait();
  };

  const payMonthlyRent = async (
    contract,
    account,
    ownerAddress,
    tenantAddress,
    monthlyRent,
    agreementId
  ) => {
    if (
      !contract ||
      !account ||
      !ownerAddress ||
      !tenantAddress ||
      !agreementId ||
      !monthlyRent
    ){
      alert("Please Fill all the details ");
      return null;
    }
    const wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseSepolia,
      });
    
      const transferFromArgs = {
        ownerAddress,
        tenantAddress,
        monthlyRent,
        agreementId
      };
    
      const contractInvocation = await wallet.invokeContract({
        contractAddress: contractAddress,
        method: "payMonthlyRent",
        args: transferFromArgs,
        abi:contractABI,
      });
      await contractInvocation.wait();
  };
  