import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AgreementCancelled } from "../generated/schema"
import { AgreementCancelled as AgreementCancelledEvent } from "../generated/Contract/Contract"
import { handleAgreementCancelled } from "../src/contract"
import { createAgreementCancelledEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let agreementId = BigInt.fromI32(234)
    let ownerAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tenantAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let securityDeposit = BigInt.fromI32(234)
    let isActive = "boolean Not implemented"
    let newAgreementCancelledEvent = createAgreementCancelledEvent(
      agreementId,
      ownerAddress,
      tenantAddress,
      securityDeposit,
      isActive
    )
    handleAgreementCancelled(newAgreementCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AgreementCancelled created and stored", () => {
    assert.entityCount("AgreementCancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AgreementCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "agreementId",
      "234"
    )
    assert.fieldEquals(
      "AgreementCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ownerAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AgreementCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tenantAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AgreementCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "securityDeposit",
      "234"
    )
    assert.fieldEquals(
      "AgreementCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "isActive",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
