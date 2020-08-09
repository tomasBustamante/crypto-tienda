pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CryptoTienda.sol";

contract TestCryptoTienda {

  function testDespligueCorrecto() public {
    CryptoTienda cryptoTienda = CryptoTienda(DeployedAddresses.CryptoTienda());

    string memory expected = "CryptoTienda";

    Assert.equal(cryptoTienda.nombre(), expected, "El nombre debe ser 'cryptotienda'.");
    Assert.equal(cryptoTienda.cantidadProductos(), 0, "La cantidad debe ser 0.");
  }

}
