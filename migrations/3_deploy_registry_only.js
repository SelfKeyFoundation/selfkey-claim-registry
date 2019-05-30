const SelfKeyClaimRegistry = artifacts.require("./SelfKeyClaimRegistry.sol")

module.exports = deployer => {
  const ledgerAddress = '0x27332286A2CEaE458b82A1235f7E2a3Aa8945cAB'  // Ropsten
  //const ledgerAddress = '0x0cb853331293d689c95187190e09bb46cb4e533e'  // Mainnet

  deployer.deploy(SelfKeyClaimRegistry, ledgerAddress)
}
