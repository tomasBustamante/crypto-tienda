const CryptoTienda = artifacts.require("./CryptoTienda.sol");

require("chai").use(require("chai-as-promised")).should();

contract("CryptoTienda", (accounts) => {
  let cryptoTienda;

  before(async () => {
    cryptoTienda = await CryptoTienda.deployed();
  });

  describe("despliegue", async () => {
    it("despliegue correcto", async () => {
      const address = await cryptoTienda.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("tiene un nombre", async () => {
      const nombre = await cryptoTienda.nombre();
      assert.equal(nombre, "CryptoTienda");
    });
  });

  describe("productos", async () => {
    it("creación de productos correcto", async () => {
      const resultado = await cryptoTienda.crearProducto(
        "iPhone X",
        web3.utils.toWei("1", "Ether"),
        { from: accounts[0] }
      );
      const totalProductos = await cryptoTienda.cantidadProductos();

      assert.equal(totalProductos, 1);
      const evento = resultado.logs[0].args;
      assert.equal(
        evento.id.toNumber(),
        totalProductos.toNumber(),
        "id es correcto"
      );
      assert.equal(evento.nombre, "iPhone X", "nombre es correcto");
      assert.equal(evento.precio, "1000000000000000000", "precio es correcto");
      assert.equal(evento.duenio, accounts[0], "dueño es correcto");
      assert.equal(evento.comprado, false, "no está comprado es correcto");
    });

    it("no se crea producto sin nombre", async () => {
      await await cryptoTienda.crearProducto(
        "",
        web3.utils.toWei("1", "Ether"),
        { from: accounts[0] }
      ).should.be.rejected;
    });

    it("no se crea producto con precio inválido", async () => {
      await await cryptoTienda.crearProducto("Notebook", 0, {
        from: accounts[0],
      }).should.be.rejected;
    });

    it("obtener el listado de productos", async () => {
      await cryptoTienda.crearProducto(
        "Samsung S20",
        web3.utils.toWei("1", "Ether"),
        { from: accounts[0] }
      );
      const totalProductos = await cryptoTienda.cantidadProductos();

      const producto = await cryptoTienda.productos(totalProductos);
      assert.equal(
        producto.id.toNumber(),
        totalProductos.toNumber(),
        "id es correcto"
      );
      assert.equal(producto.nombre, "Samsung S20", "nombre es correcto");
      assert.equal(
        producto.precio,
        "1000000000000000000",
        "precio es correcto"
      );
      assert.equal(producto.duenio, accounts[0], "dueño es correcto");
      assert.equal(producto.comprado, false, "no está comprado es correcto");
    });

    it("venta de productos correcto", async () => {
      const vendedor = accounts[0];
      const comprador = accounts[1];
      await cryptoTienda.crearProducto(
        "iPhone X",
        web3.utils.toWei("1", "Ether"),
        { from: vendedor }
      );
      const totalProductos = await cryptoTienda.cantidadProductos();
      let saldoInicialVendedor = await web3.eth.getBalance(vendedor);
      saldoInicialVendedor = new web3.utils.BN(saldoInicialVendedor);

      const resultado = await cryptoTienda.comprarProducto(totalProductos, {
        from: comprador,
        value: web3.utils.toWei("1", "Ether"),
      });

      const evento = resultado.logs[0].args;
      assert.equal(
        evento.id.toNumber(),
        totalProductos.toNumber(),
        "id es correcto"
      );
      assert.equal(evento.nombre, "iPhone X", "name es correcto");
      assert.equal(evento.precio, "1000000000000000000", "precio es correcto");
      assert.equal(evento.duenio, comprador, "duenio es correcto");
      assert.equal(evento.comprado, true, "está comprado es correcto");

      // Verificar que el vendedor recibió los fondos
      let saldoFinalVendedor = await web3.eth.getBalance(vendedor);
      saldoFinalVendedor = new web3.utils.BN(saldoFinalVendedor);

      let precio = web3.utils.toWei("1", "Ether");
      precio = new web3.utils.BN(precio);

      const saldoEsperado = saldoInicialVendedor.add(precio);

      assert.equal(saldoFinalVendedor.toString(), saldoEsperado.toString());
    });

    it("no se puede comprar un producto que no existe", async () => {
      await cryptoTienda.comprarProducto(99, {
        from: accounts[0],
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });

    it("no se puede comprar un producto si no tiene el saldo suficiente", async () => {
      await cryptoTienda.crearProducto(
        "Samsung S20",
        web3.utils.toWei('1', 'Ether'),
        { from: accounts[0] }
      );
      const totalProductos = await cryptoTienda.cantidadProductos();
      
      await cryptoTienda.comprarProducto(totalProductos,{
        from: accounts[1],
        value: web3.utils.toWei('0.5', 'Ether')
      }).should.be.rejected;
    });

    it("el vendedor no puede comprar el producto que vende", async () => {
      await cryptoTienda.crearProducto(
        "Samsung S20",
        web3.utils.toWei('1', 'Ether'),
        { from: accounts[0] }
      );
      const totalProductos = await cryptoTienda.cantidadProductos();
      
      await cryptoTienda.comprarProducto(totalProductos,{
        from: accounts[0],
        value: web3.utils.toWei('1', 'Ether')
      }).should.be.rejected;
    });
  });
});
