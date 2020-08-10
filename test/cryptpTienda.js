const CryptoTienda = artifacts.require("./CryptoTienda.sol");

contract("CryptoTienda", accounts => {
  let cryptoTienda;

  before(async () => {
    cryptoTienda = await CryptoTienda.deployed();
  })
  
  describe('despliegue', async () => {
    it('despliegue correcto', async () => {
      const address = await cryptoTienda.address;
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('tiene un nombre', async () => {
      const nombre = await cryptoTienda.nombre();
      assert.equal(nombre, 'CryptoTienda');
    })
  })
});
