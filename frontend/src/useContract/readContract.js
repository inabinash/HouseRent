import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import {
  TRANSACTIONS_OF_OWNER,
  TRANSACTIONS_OF_TENANT,
  AGREEMENTS_BY_OWNER,
  AGREEMENTS_OF_TENANT,
} from "./graph_queries";

const contractJson = require("../contracts/HouseRent.json");
const contractABI = contractJson.abi;
const contractAddress = "0x28Bc7B45b1A6f9246503c15FADCca2F391A2c4B9";

const url = 'https://api.studio.thegraph.com/query/58361/houserent/version/latest'

const headers = { Authorization: 'Bearer b34f10f45e3086fdafe9a488aff659e9' }

// Custom Hook to get agreements of owner

export const getAgreementsOfOwner = async(ownerAddress)=>{
  return  await request(url, AGREEMENTS_BY_OWNER, { ownerAddress } , headers);
}

export const useAgreementsOfOwner = (ownerAddress) => {
  return useQuery(
    ["data"],
    async () => {
      const response = await request(url, AGREEMENTS_BY_OWNER, { ownerAddress });
      return response.data;
    },
    {
      enabled: !!ownerAddress, 
    }
  );
};

// Custom Hook to get agreements of tenant
export const useAgreementsOfTenant = (tenantAddress) => {
  return useQuery(
    ["data"],
    async () => {
      const response = await request(url, AGREEMENTS_OF_TENANT, { tenantAddress });
      return response.data;
    },
    {
      enabled: !!tenantAddress,
    }
  );
};

// Custom Hook to get transactions of tenant
export const useTransactionsOfTenant = (tenantAddress) => {
  return useQuery(
    ["data"],
    async () => {
      const response = await request(url, TRANSACTIONS_OF_TENANT, { tenantAddress });
      return response.data;
    },
    {
      enabled: !!tenantAddress,
    }
  );
};

// Custom Hook to get transactions of owner
export const useTransactionsOfOwner = (ownerAddress) => {
  return useQuery(
    ["data"],
    async () => {
      const response = await request(url, TRANSACTIONS_OF_OWNER, { ownerAddress });
      return response.data;
    },
    {
      enabled: !!ownerAddress,
    }
  );
};

// Function to get reputation list of user
export const getReputationOfUser = async (contract, user) => {
  if (!contract || !user) return null;

  const res = await contract.getReputationHistory(user);
  return res;
  // const res= await readContract({
  //   networkId: Coinbase.networks.BaseSepolia,
  //   abi:contractABI,
  //   contractAddress:contractAddress,
  //   method:"getReputationHistory",
  //   args:{user:user}
  // })

  // return res;
};

// export const GetCurrentTimeStamp = async (contract) => {
//   if (!contract) return null;

//   // const res = await contract.getCurrentTimeStamp();
//   // return res;
//   const res= await readContract({
//     networkId: Coinbase.networks.BaseSepolia,
//     abi:contractABI,
//     contractAddress:contractAddress,
//     method:"getCurrentTimeStamp",
//     args:{}
//   })

//   return res;
// };
