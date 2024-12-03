import { Bytes, BigInt, store } from "@graphprotocol/graph-ts";
import {
  AgreementCancelled as AgreementCancelledEvent,
  AgreementCreated as AgreementCreatedEvent,
  RentPaid as RentPaidEvent,
  SecuityDeposited as SecuityDepositedEvent,
  TenureCompleted as TenureCompletedEvent,
} from "../generated/Contract/Contract";
import {
  AgreementCancelled,
  AgreementCreated,
  RentPaid,
  SecuityDeposited,
  TenureCompleted,
} from "../generated/schema";

function bigIntToBytes(bigInt: BigInt): Bytes {
  let hexString = bigInt.toHexString(); // Convert BigInt to a hex string
  // Remove the "0x" prefix (optional step)
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  // Convert the hex string to a byte array
  let byteArray = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }

  return Bytes.fromUint8Array(byteArray); // Convert the byte array to Bytes
}

export function handleAgreementCancelled(event: AgreementCancelledEvent): void {
  let entity = new AgreementCancelled(bigIntToBytes(event.params.agreementId));
  entity.agreementId = event.params.agreementId;
  entity.ownerAddress = event.params.ownerAddress;
  entity.tenantAddress = event.params.tenantAddress;
  entity.securityDeposit = event.params.securityDeposit;
  entity.isActive = event.params.isActive;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // delete the agreement
  let agreementEntity = AgreementCreated.load(
    bigIntToBytes(event.params.agreementId)
  );
  if (agreementEntity != null) {
    store.remove(
      "AgreementCreated",
      bigIntToBytes(event.params.agreementId).toHexString()
    );
  }
}

export function handleAgreementCreated(event: AgreementCreatedEvent): void {
  let entity = new AgreementCreated(
    // event.transaction.hash.concatI32(event.logIndex.toI32())
    bigIntToBytes(event.params.agreementId)
  );
  entity.ownerAddress = event.params.ownerAddress;
  entity.tenantAddress = event.params.tenantAddress;
  entity.securityDeposit = event.params.securityDeposit;
  entity.monthlyRent = event.params.monthlyRent;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;
  entity.agreementId = event.params.agreementId;
  entity.isActive = event.params.isActive;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRentPaid(event: RentPaidEvent): void {
  let entity = new RentPaid(
    // event.transaction.hash.concatI32(event.logIndex.toI32())
    bigIntToBytes(event.params.agreementId)
  );
  entity.ownerAddress = event.params.ownerAddress;
  entity.tenantAddress = event.params.tenantAddress;
  entity.monthlyRent = event.params.monthlyRent;
  entity.datePaid = event.params.datePaid;
  entity.agreementId = event.params.agreementId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSecuityDeposited(event: SecuityDepositedEvent): void {
  let entity = new SecuityDeposited(
    // event.transaction.hash.concatI32(event.logIndex.toI32())
    bigIntToBytes(event.params.agreementId)
  );
  entity.ownerAddress = event.params.ownerAddress;
  entity.tenantAddress = event.params.tenantAddress;
  entity.securityDeposit = event.params.securityDeposit;
  entity.datePaid = event.params.datePaid;
  entity.agreementId = event.params.agreementId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTenureCompleted(event: TenureCompletedEvent): void {
  let entity = new TenureCompleted(
    // event.transaction.hash.concatI32(event.logIndex.toI32())
    bigIntToBytes(event.params.agreementId)
  );
  entity.agreementId = event.params.agreementId;
  entity.ownerAddress = event.params.ownerAddress;
  entity.tenantAddress = event.params.tenantAddress;
  entity.refundAmount = event.params.refundAmount;
  entity.isActive = event.params.isActive;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // delete the agreement
  let agreementEntity = AgreementCreated.load(
    bigIntToBytes(event.params.agreementId)
  );
  if (agreementEntity != null) {
    store.remove(
      "AgreementCreated",
      bigIntToBytes(event.params.agreementId).toHexString()
    );
  }
}
