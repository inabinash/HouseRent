import { gql } from "graphql-request";

export const AGREEMENTS_BY_OWNER = gql`
  query GetActiveAgreementsByOwner($ownerAddress: Bytes!) {
    agreements(where: { ownerAddress: $ownerAddress, isActive: true }) {
      id
      ownerAddress
      tenantAddress
      securityDeposit
      monthlyRent
      startTime
      endTime
      agreementId
      isActive
    }
  }
`;

export const AGREEMENTS_OF_TENANT = gql`
  query GetActiveAgreementsByOwner($tenantAddress: Bytes!) {
    agreements(
      where: { tenantAddress: $tenantAddress, isActive: true }
    ) {
      id
      ownerAddress
      tenantAddress
      securityDeposit
      monthlyRent
      startTime
      endTime
      agreementId
      isActive
      isSecurityDeposited
    }
  }
`;
export const TRANSACTIONS_OF_AGREEMENT = gql`
query GetEventsByTenant($agreementId: BigInt!) {
transactions(
  where: { agreementId: $agreementId }
) {
  id
  ownerAddress
  tenantAddress
  amount
  agreementId
}
`;

