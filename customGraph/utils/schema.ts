import {
    TypedMap,
    Entity,
    Value,
    ValueKind,
    store,
    Bytes,
    BigInt,
    BigDecimal,
  } from "@graphprotocol/graph-ts";

export class Agreement extends Entity{
    constructor(id:Bytes){
        super();
        this.set("id", Value.fromBytes(id));
    }
    save(): void {
        let id = this.get("id");
        assert(id != null, "Cannot save Agreement entity without an ID");
        if (id) {
          assert(
            id.kind == ValueKind.BYTES,
            `Entities of type AgreementCreated must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
          );
          store.set("AgreementCreated", id.toBytes().toHexString(), this);
        }
      }
}