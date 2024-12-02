import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AgreementCreated } from "../generated/schema"
import { AgreementCreated as AgreementCreatedEvent } from "../generated/Contract/Contract"
import { handleAgreementCreated } from "../src/contract"
import { createAgreementCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let ownerAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tenantAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let securityDeposit = BigInt.fromI32(234)
    let monthlyRent = BigInt.fromI32(234)
    let startTime = BigInt.fromI32(234)
    let endTime = BigInt.fromI32(234)
    let agreementId = BigInt.fromI32(234)
    let newAgreementCreatedEvent = createAgreementCreatedEvent(
      ownerAddress,
      tenantAddress,
      securityDeposit,
      monthlyRent,
      startTime,
      endTime,
      agreementId
    )
    handleAgreementCreated(newAgreementCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AgreementCreated created and stored", () => {
    assert.entityCount("AgreementCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ownerAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tenantAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "securityDeposit",
      "234"
    )
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "monthlyRent",
      "234"
    )
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startTime",
      "234"
    )
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endTime",
      "234"
    )
    assert.fieldEquals(
      "AgreementCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "agreementId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
