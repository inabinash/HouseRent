import { gql, request } from "graphql-request";
const query = gql`
  {
    agreementCreateds(first: 5) {
      id
      ownerAddress
      tenantAddress
      securityDeposit
    }
    rentPaids(first: 5) {
      id
      ownerAddress
      tenantAddress
      datePaid
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/58361/houserent/version/latest";
async function fetchSubgraphData() {
  return await request(url, query);
}
fetchSubgraphData()
  .then((data) => console.log({ data }))
  .catch(console.error);
