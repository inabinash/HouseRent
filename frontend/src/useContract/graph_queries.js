import { gql } from "graphql-request";

export const AGREEMENTS_BY_OWNER = gql`
  query GetActiveAgreementsByOwner($ownerAddress: Bytes!) {
    agreementCreateds(where: { ownerAddress: $ownerAddress, isActive: true }) {
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
    agreementCreateds(
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
export const TRANSACTIONS_OF_TENANT = gql`
query GetEventsByTenant($tenantAddress: Bytes!) {
  rentPaids(
    first: 10
    where: { tenantAddress: $tenantAddress }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    ownerAddress
    tenantAddress
    monthlyRent
    datePaid
    agreementId
    blockTimestamp
  }
  securityDepositeds(
    first: 10
    where: { tenantAddress: $tenantAddress }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    ownerAddress
    tenantAddress
    securityDeposit
    datePaid
    agreementId
    blockTimestamp
  }`;

export const TRANSACTIONS_OF_OWNER = gql`
query GetEventsByOwner($ownerAddress: Bytes!) {
  rentPaids(
    first: 10
    where: { ownerAddress: $ownerAddress }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    ownerAddress
    tenantAddress
    monthlyRent
    datePaid
    agreementId
    blockTimestamp
  }
  tenureCompleteds(
    first: 10
    where: { ownerAddress: $ownerAddress }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    ownerAddress
    tenantAddress
    refundAmount
    datePaid
    agreementId
    blockTimestamp
}`;
