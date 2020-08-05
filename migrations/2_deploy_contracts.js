var SimpleStorage = artifacts.require("./SimpleStorage.sol");
const CryptoTienda = artifacts.require("./CryptoTienda.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(CryptoTienda);
};
