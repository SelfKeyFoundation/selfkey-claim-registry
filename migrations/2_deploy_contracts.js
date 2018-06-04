//const StakedAccess = artifacts.require('./StakedAccess.sol')
const ClaimRegistry = artifacts.require("./ClaimRegistry.sol")

module.exports = deployer => {
  deployer.deploy(ClaimRegistry)
}
