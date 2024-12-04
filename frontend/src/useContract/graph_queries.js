import { gql } from "graphql-request";

export const AGREEMENTS_BY_OWNER = gql `
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
`

export const AGREEMENTS_OF_TENANT = gql `
query GetActiveAgreementsByOwner($tenantAddress: Bytes!) {
  agreementCreateds(where: { tenantAddress: $tenantAddress, isActive: true }) {
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
`

