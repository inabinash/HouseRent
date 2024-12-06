import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import {
  TRANSACTIONS_OF_OWNER,
  TRANSACTIONS_OF_TENANT,
  AGREEMENTS_BY_OWNER,
  AGREEMENTS_OF_TENANT,
} from "./graph_queries";

const url =
  "https://api.studio.thegraph.com/query/58361/houserent/version/latest";

//get agreements of owner
export const GetAgreementsOfOwner = (ownerAddress) => {
  const { data, status } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, AGREEMENTS_BY_OWNER, { ownerAddress });
    },
  });
  return { data, status };
};
//get agreements of tentat

export const GetAgreementsOfTentat = () => {
  const { data, status } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, AGREEMENTS_OF_TENANT);
    },
  });
  return { data, status };
};

//get list of transactions made by the tenant
export const GetTransactionsOfTentant = () => {
  const { data, status } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, TRANSACTIONS_OF_TENANT);
    },
  });
  return { data, status };
};

//get list of transactions made to the owner

export const GetTransactionsOfOwner = () => {
  const { data, status } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, TRANSACTIONS_OF_OWNER);
    },
  });
  return { data, status };
};

//get reputation list of user

export const GetReputationOfUser = async (contract, user) => {
  if (!contract || !user) return null;

  const res = await contract.getReputationHistory(user);
  return res;
};

export const GetCurrentTimeStamp = async (contract) => {
  if (!contract) return null;

  const res = await contract.getCurrentTimeStamp();
  return res;
};
