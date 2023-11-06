const AccountRegistry = artifacts.require("AccountRegistry.sol");

module.exports = function (deployer) {
  deployer.deploy(AccountRegistry);
};
