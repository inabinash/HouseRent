import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AgreementCancelled,
  AgreementCreated,
  RentPaid,
  SecuityDeposited,
  TenureCompleted
} from "../generated/HouseRent/HouseRent"

export function createAgreementCancelledEvent(
  agreementId: BigInt,
  ownerAddress: Address,
  tenantAddress: Address,
  securityDeposit: BigInt,
  isActive: boolean
): AgreementCancelled {
  let agreementCancelledEvent = changetype<AgreementCancelled>(newMockEvent())

  agreementCancelledEvent.parameters = new Array()

  agreementCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  agreementCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )
  agreementCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tenantAddress",
      ethereum.Value.fromAddress(tenantAddress)
    )
  )
  agreementCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "securityDeposit",
      ethereum.Value.fromUnsignedBigInt(securityDeposit)
    )
  )
  agreementCancelledEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )

  return agreementCancelledEvent
}

export function createAgreementCreatedEvent(
  ownerAddress: Address,
  tenantAddress: Address,
  securityDeposit: BigInt,
  monthlyRent: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  agreementId: BigInt,
  isActive: boolean,
  isSecurityDeposited: boolean
): AgreementCreated {
  let agreementCreatedEvent = changetype<AgreementCreated>(newMockEvent())

  agreementCreatedEvent.parameters = new Array()

  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tenantAddress",
      ethereum.Value.fromAddress(tenantAddress)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "securityDeposit",
      ethereum.Value.fromUnsignedBigInt(securityDeposit)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "monthlyRent",
      ethereum.Value.fromUnsignedBigInt(monthlyRent)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )
  agreementCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "isSecurityDeposited",
      ethereum.Value.fromBoolean(isSecurityDeposited)
    )
  )

  return agreementCreatedEvent
}

export function createRentPaidEvent(
  ownerAddress: Address,
  tenantAddress: Address,
  monthlyRent: BigInt,
  datePaid: BigInt,
  agreementId: BigInt
): RentPaid {
  let rentPaidEvent = changetype<RentPaid>(newMockEvent())

  rentPaidEvent.parameters = new Array()

  rentPaidEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam(
      "tenantAddress",
      ethereum.Value.fromAddress(tenantAddress)
    )
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam(
      "monthlyRent",
      ethereum.Value.fromUnsignedBigInt(monthlyRent)
    )
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam(
      "datePaid",
      ethereum.Value.fromUnsignedBigInt(datePaid)
    )
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )

  return rentPaidEvent
}

export function createSecuityDepositedEvent(
  ownerAddress: Address,
  tenantAddress: Address,
  securityDeposit: BigInt,
  datePaid: BigInt,
  agreementId: BigInt
): SecuityDeposited {
  let secuityDepositedEvent = changetype<SecuityDeposited>(newMockEvent())

  secuityDepositedEvent.parameters = new Array()

  secuityDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )
  secuityDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "tenantAddress",
      ethereum.Value.fromAddress(tenantAddress)
    )
  )
  secuityDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "securityDeposit",
      ethereum.Value.fromUnsignedBigInt(securityDeposit)
    )
  )
  secuityDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "datePaid",
      ethereum.Value.fromUnsignedBigInt(datePaid)
    )
  )
  secuityDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )

  return secuityDepositedEvent
}

export function createTenureCompletedEvent(
  agreementId: BigInt,
  ownerAddress: Address,
  tenantAddress: Address,
  refundAmount: BigInt,
  isActive: boolean
): TenureCompleted {
  let tenureCompletedEvent = changetype<TenureCompleted>(newMockEvent())

  tenureCompletedEvent.parameters = new Array()

  tenureCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  tenureCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAddress",
      ethereum.Value.fromAddress(ownerAddress)
    )
  )
  tenureCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "tenantAddress",
      ethereum.Value.fromAddress(tenantAddress)
    )
  )
  tenureCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "refundAmount",
      ethereum.Value.fromUnsignedBigInt(refundAmount)
    )
  )
  tenureCompletedEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )

  return tenureCompletedEvent
}
