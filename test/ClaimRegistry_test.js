const assertThrows = require("./utils/assertThrows")
const { getLog } = require("./utils/txHelpers")
const timeTravel = require("./utils/timeTravel")

//const MockKey = artifacts.require("../test/mock/MockKey.sol")
const ClaimRegistry = artifacts.require("./ClaimRegistry.sol")

contract("ClaimRegistry", accounts => {
  const [owner, issuer, issuer2, subject, subject2] = accounts.slice(0)

  const now = new Date().getTime() / 1000

  let claimRegistry
  let token
  let serviceID

  before(async () => {
    claimRegistry = await ClaimRegistry.new()
    assert.notEqual(claimRegistry, null)
    assert.notEqual(claimRegistry, undefined)
  })

  context("Claim Issuance", () => {
    it("can add an arbitrary claim about a subject", async () => {
      const tx = await claimRegistry.setClaim(subject, "age", 21, {
        from: issuer
      })
      assert.notEqual(getLog(tx, "ClaimSet"), null)
    })

    it("allows querying for a given claim if exists", async () => {
      const claimValue = await claimRegistry.getClaim(issuer, subject, "age")
      assert.notEqual(Number(claimValue), 0)
      // NOTE: proper conversion of data should be used to compare with the actual expected value
      // Also, there's nothing differentiating between a claim value being zero and not existing
    })

    it("it allows setting a self-issued claim", async () => {
      const tx = await claimRegistry.setSelfClaim("name", "Harrb Monger", {
        from: issuer2
      })
      assert.notEqual(getLog(tx, "ClaimSet"), null)
      const claimValue = await claimRegistry.getClaim(issuer2, issuer2, "name")
      assert.notEqual(Number(claimValue), 0)
      // NOTE: proper conversion of data should be used to compare with the actual expected value
      // Also, there's nothing differentiating between a claim value being zero and not existing
    })

    it("allows removal of claim by the issuer", async () => {
      const tx = await claimRegistry.removeClaim(issuer2, subject, "name", {
        from: issuer2
      })
      assert.notEqual(getLog(tx, "ClaimRemoved"), null)
      const claimValue = await claimRegistry.getClaim(issuer2, subject, "name")
      assert.equal(Number(claimValue), 0)
    })

    it("does not allow removal of a claim by a non-issuer", async () => {
      await assertThrows(
        claimRegistry.removeClaim(issuer, subject, "age", { from: subject })
      )
    })
  })
})
