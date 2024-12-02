import {
  AgreementCreated as AgreementCreatedEvent,
  RentPaid as RentPaidEvent,
  SecuityDeposited as SecuityDepositedEvent,
  TenureCompleted as TenureCompletedEvent
} from "../generated/Contract/Contract"
import {
  AgreementCreated,
  RentPaid,
  SecuityDeposited,
  TenureCompleted
} from "../generated/schema"

export function handleAgreementCreated(event: AgreementCreatedEvent): void {
  let entity = new AgreementCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ownerAddress = event.params.ownerAddress
  entity.tenantAddress = event.params.tenantAddress
  entity.securityDeposit = event.params.securityDeposit
  entity.monthlyRent = event.params.monthlyRent
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.agreementId = event.params.agreementId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRentPaid(event: RentPaidEvent): void {
  let entity = new RentPaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ownerAddress = event.params.ownerAddress
  entity.tenantAddress = event.params.tenantAddress
  entity.datePaid = event.params.datePaid
  entity.AgreementId = event.params.AgreementId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSecuityDeposited(event: SecuityDepositedEvent): void {
  let entity = new SecuityDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ownerAddress = event.params.ownerAddress
  entity.tenantAddress = event.params.tenantAddress
  entity.completionTime = event.params.completionTime
  entity.agreementId = event.params.agreementId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTenureCompleted(event: TenureCompletedEvent): void {
  let entity = new TenureCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementId = event.params.agreementId
  entity.ownerAddress = event.params.ownerAddress
  entity.tenatAddress = event.params.tenatAddress
  entity.refundAmount = event.params.refundAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}