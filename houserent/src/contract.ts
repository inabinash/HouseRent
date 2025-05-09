import {
  AgreementCancelled as AgreementCancelledEvent,
  AgreementCreated as AgreementCreatedEvent,
  LogDeposit as LogDepositEvent,
  LogPrice as LogPriceEvent,
  RentPaid as RentPaidEvent,
  SecuityDeposited as SecuityDepositedEvent,
  TenureCompleted as TenureCompletedEvent
} from "../generated/Contract/Contract"
import {
  AgreementCancelled,
  AgreementCreated,
  LogDeposit,
  LogPrice,
  RentPaid,
  SecuityDeposited,
  TenureCompleted
} from "../generated/schema"

export function handleAgreementCancelled(event: AgreementCancelledEvent): void {
  let entity = new AgreementCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementId = event.params.agreementId
  entity.ownerAddress = event.params.ownerAddress
  entity.tenantAddress = event.params.tenantAddress
  entity.securityDeposit = event.params.securityDeposit
  entity.isActive = event.params.isActive

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
 console.log("hi iam called in agreement cancelled");
  entity.save()
}

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
  entity.isActive = event.params.isActive
  entity.isSecurityDeposited = event.params.isSecurityDeposited

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLogDeposit(event: LogDepositEvent): void {
  let entity = new LogDeposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.deposit = event.params.deposit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLogPrice(event: LogPriceEvent): void {
  let entity = new LogPrice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.price = event.params.price

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
  entity.monthlyRent = event.params.monthlyRent
  entity.datePaid = event.params.datePaid
  entity.agreementId = event.params.agreementId

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
  entity.securityDeposit = event.params.securityDeposit
  entity.datePaid = event.params.datePaid
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
  entity.tenantAddress = event.params.tenantAddress
  entity.refundAmount = event.params.refundAmount
  entity.isActive = event.params.isActive

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
