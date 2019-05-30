const assertThrows = require("./utils/assertThrows")
const { getLog } = require("./utils/txHelpers")
const timeTravel = require("./utils/timeTravel")
const util = require('ethereumjs-util')

const DIDLedger = artifacts.require("./ledger/DIDLedger.sol")
const SelfKeyClaimRegistry = artifacts.require("./SelfKeyClaimRegistry.sol")

contract("SelfKeyClaimRegistry", accounts => {

  const [
    admin,
    issuer1,
    issuer2,
    subject1,
    subject2
  ] = accounts.slice(0)

  const zero = util.bufferToHex(util.setLengthLeft(0, 32))

  //const now = new Date().getTime() / 1000

  let claims, ledger
  let issuer1DID, issuer2DID, subject1DID, subject2DID
  //let anySubject

  before(async () => {
    ledger = await DIDLedger.new()
    claims = await SelfKeyClaimRegistry.new(ledger.address)

    let tx = await ledger.createDID(zero, { from: issuer1 })
    let log = getLog(tx, "CreatedDID")
    issuer1DID = log.args.id

    tx = await ledger.createDID(zero, { from: subject1 })
    log = getLog(tx, "CreatedDID")
    subject1DID = log.args.id
  })

  context("Claim Issuance", () => {
    it("(only issuer DID controller address) can add a claim about a subject", async () => {
      let value = web3.utils.keccak256("value-us_citizen")
      let key = web3.utils.keccak256("type-citizenship")

      await assertThrows(claims.setClaim(issuer1DID, subject1DID, key, value, { from: issuer2 }))

      let tx = await claims.setClaim(
        issuer1DID,
        subject1DID,
        key,
        value,
        { from: issuer1 }
      )
      let log = getLog(tx, "ClaimSet")

      assert.equal(log.args.issuerAddress, issuer1)
      assert.equal(log.args.issuerDID, issuer1DID)
      assert.equal(log.args.subject, subject1DID)
      assert.equal(log.args.key, key)
      assert.equal(log.args.value, value)
    })

    it("allows querying for a given claim if exists", async () => {
      let value = web3.utils.keccak256("value-us_citizen")
      let key = web3.utils.keccak256("type-citizenship")
      let claim = await claims.getClaim(issuer1DID, subject1DID, key)
      assert.equal(claim, value)
    })

    it("allows removal of claim (only) by the issuer", async () => {
      await assertThrows(claims.removeClaim(
        issuer1DID,
        subject1DID,
        web3.utils.keccak256("type-citizenship"),
        { from: admin }
      ))

      let tx = await claims.removeClaim(
        issuer1DID,
        subject1DID,
        web3.utils.keccak256("type-citizenship"),
        { from: issuer1 }
      )
      let log = getLog(tx, "ClaimRemoved")
      //console.log(log)

      let claim = await claims.getClaim(issuer1DID, subject1DID, web3.utils.keccak256("type-citizenship"))
      assert.equal(claim, 0)
    })
  })
})
