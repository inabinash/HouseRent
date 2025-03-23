import { BigInt , Bytes ,ByteArray, log} from '@graphprotocol/graph-ts';
import { Agreement, Transaction } from './generated/schema';
import {
    AgreementCancelled as AgreementCancelledEvent,
    AgreementCreated as AgreementCreatedEvent,
    LogDeposit as LogDepositEvent,
    LogPrice as LogPriceEvent,
    RentPaid as RentPaidEvent,
    SecuityDeposited as SecuityDepositedEvent,
    TenureCompleted as TenureCompletedEvent
  } from "./generated/HouseRent/HouseRent"

import {
    Agreement as AgreementEntity,
    Transaction as TransactionEntity
} from "./generated/schema"

export function bigIntToBytes(value: BigInt): Bytes {
    return Bytes.fromByteArray(ByteArray.fromBigInt(value));
  }

export function handleAgreementCreated(event: AgreementCreatedEvent):void{
    let bytesKey = bigIntToBytes(event.params.agreementId);
    let entity = new Agreement(bytesKey);

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

    log.info("Agreement created with entityid {}", [(event.params.agreementId).toString()]);
    entity.save() 
}

export function handleAgreementCancelled(event : AgreementCancelledEvent):void{
    let key = bigIntToBytes(event.params.agreementId);
    let entity  = Agreement.load(key);
    if(entity){
        entity.remove();
        log.info("deleted entitity with entityid {}", [(event.params.agreementId).toString()]);
    }
    else{
        log.error("cannot delete entitity with entityid {}", [(event.params.agreementId).toString()]);
    }
}

export function handleRentPaid(event : RentPaidEvent):void{
    let entity = new Transaction(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      )
      entity.to = event.params.ownerAddress
      entity.from = event.params.tenantAddress
      entity.amount = event.params.monthlyRent
      entity.agreementId = event.params.agreementId
      entity.type = "Rent"

      entity.save()
}

export function handleSecuityDeposited(event : SecuityDepositedEvent):void{
    let entity = new Transaction(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      )
      entity.to = event.params.ownerAddress
      entity.from = event.params.tenantAddress
      entity.amount = event.params.securityDeposit
      entity.agreementId = event.params.agreementId
      entity.type = "SecurityDeposit"
      entity.save()
}

export function handleTenureCompleted(event : TenureCompletedEvent):void{
    let key = bigIntToBytes(event.params.agreementId);
    let entity  = Agreement.load(key);
    if(entity){
        entity.isActive = false;
        entity.save();
    }
    else{
        log.error("cannot update entitity with entityid {}", [(event.params.agreementId).toString()]);
    }

    let entity1 = new Transaction(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      )
        entity1.from = event.params.ownerAddress
        entity1.to = event.params.tenantAddress
        entity1.amount = event.params.refundAmount
        entity1.agreementId = event.params.agreementId
        entity1.type = "Refund"
        entity1.save()
}



