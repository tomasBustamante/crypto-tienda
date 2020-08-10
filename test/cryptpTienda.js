const CryptoTienda = artifacts.require("./CryptoTienda.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract("CryptoTienda", accounts => {
  let cryptoTienda;

  before(async () => {
    cryptoTienda = await CryptoTienda.deployed();
  });
  
  describe('despliegue', async () => {
    it('despliegue correcto', async () => {
      const address = await cryptoTienda.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('tiene un nombre', async () => {
      const nombre = await cryptoTienda.nombre();
      assert.equal(nombre, 'CryptoTienda');
    });
  });

  describe('productos', async () => {
    it('creación de productos correcto', async () => {
      const resultado = await cryptoTienda.crearProducto('iPhone X', web3.utils.toWei('1', 'Ether'), { from: accounts[0] });
      const totalProductos = await cryptoTienda.cantidadProductos();

      assert.equal(totalProductos, 1);
      const evento = resultado.logs[0].args;
      assert.equal(evento.id.toNumber(), totalProductos.toNumber(), 'id es correcto');
      assert.equal(evento.nombre, 'iPhone X', 'nombre es correcto');
      assert.equal(evento.precio, '1000000000000000000', 'precio es correcto');
      assert.equal(evento.duenio, accounts[0], 'dueño es correcto');
      assert.equal(evento.comprado, false, 'no está comprado es correcto');
    })

    it('no se crea producto sin nombre', async () => {
      await await cryptoTienda.crearProducto('', web3.utils.toWei('1', 'Ether'), { from: accounts[0] }).should.be.rejected;
    })
  });
});
