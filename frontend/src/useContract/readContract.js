import request from "graphql-request";
import {
  TRANSACTIONS_OF_AGREEMENT,
  AGREEMENTS_BY_OWNER,
  AGREEMENTS_OF_TENANT,
  AGREEMENTS_BY_ID,
  AGREEMENTS_OF_TENANT_BY_ID,
} from "./graph_queries";

const contractJson = require("../contracts/HouseRent.json");
const contractABI = contractJson.abi;
const contractAddress = "0x28Bc7B45b1A6f9246503c15FADCca2F391A2c4B9";

// const url = 'https://api.studio.thegraph.com/query/58361/houserent/version/latest'
const url = 'https://api.studio.thegraph.com/query/58361/customgraph/version/latest'

const headers = { Authorization: 'Bearer b34f10f45e3086fdafe9a488aff659e9' }

// Custom Hook to get agreements of owner

export const getAgreementsOfOwner = async(ownerAddress)=>{
  return  await request(url, AGREEMENTS_BY_OWNER, { ownerAddress } , headers);
}

export const getAgreementsOfTenant = async(tenantAddress)=>{
  return  await request(url, AGREEMENTS_OF_TENANT, { tenantAddress } , headers);
}

export const getTransactionsOfAgreement = async(agreementId)=>{
  return  await request(url, TRANSACTIONS_OF_AGREEMENT, { agreementId } , headers);
}

//Function to get agreement by agreementId
export const getAgreementById = async(agreementId)=>{
  return  await request(url, AGREEMENTS_BY_ID, { agreementId } , headers);
}
//Function to get agreement by agreementId for tenant
export const getAgreementOfTenantById = async(tenantAddress,agreementId)=>{
  return  await request(url, AGREEMENTS_OF_TENANT_BY_ID, { tenantAddress,agreementId } , headers);
}

// Function to get reputation list of user 
export const getReputationOfUser = async (contract, user) => {
  if (!contract || !user) return null;

  const res = await contract.getReputationHistory(user);
  return res;
};

export const getCurrentTimestamp = async(contract) => {
  if (!contract) return null;

  const res = await contract.getCurrentTimestamp();
  return res;
}

