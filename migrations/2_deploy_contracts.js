const SelfKeyClaimRegistry = artifacts.require("./SelfKeyClaimRegistry.sol")
const DIDLedger = artifacts.require("DIDLedger.sol")

module.exports = deployer => {
  deployer.deploy(DIDLedger).then(() => {
    return deployer.deploy(SelfKeyClaimRegistry, DIDLedger.address)
  })
}
