import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AgreementCreated,
  RentPaid,
  SecuityDeposited,
  TenureCompleted
} from "../generated/Contract/Contract"

export function createAgreementCreatedEvent(
  ownerAddress: Address,
  tenantAddress: Address,
  securityDeposit: BigInt,
  monthlyRent: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  agreementId: BigInt
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

  return agreementCreatedEvent
}

export function createRentPaidEvent(
  ownerAddress: Address,
  tenantAddress: Address,
  datePaid: BigInt,
  AgreementId: BigInt
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
      "datePaid",
      ethereum.Value.fromUnsignedBigInt(datePaid)
    )
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam(
      "AgreementId",
      ethereum.Value.fromUnsignedBigInt(AgreementId)
    )
  )

  return rentPaidEvent
}

export function createSecuityDepositedEvent(
  ownerAddress: Address,
  tenantAddress: Address,
  completionTime: BigInt,
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
      "completionTime",
      ethereum.Value.fromUnsignedBigInt(completionTime)
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
  tenatAddress: Address,
  refundAmount: BigInt
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
      "tenatAddress",
      ethereum.Value.fromAddress(tenatAddress)
    )
  )
  tenureCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "refundAmount",
      ethereum.Value.fromUnsignedBigInt(refundAmount)
    )
  )

  return tenureCompletedEvent
}
