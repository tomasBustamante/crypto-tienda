pragma solidity ^0.5.0;

contract CryptoTienda {
    string public nombre;
    uint public cantidadProductos = 0;
    mapping(uint => Producto) public productos;

    struct Producto {
        uint id;
        string nombre;
        uint precio;
        address payable duenio;
        bool comprado;
    }

    event ProductoCreado(
        uint id,
        string nombre,
        uint precio,
        address payable duenio,
        bool comprado
    );

    event ProductoComprado(
        uint id,
        string nombre,
        uint precio,
        address payable duenio,
        bool comprado
    );

    constructor() public {
        nombre = "CryptoTienda";
    }

    function crearProducto(string memory _nombre, uint _precio) public {
        // Requerir un nombre valido
        require(bytes(_nombre).length > 0);

        // Requerir un precio valido
        require(_precio > 0);

        // Incrementar la cantidad de productos
        cantidadProductos ++;

        // Crear el producto
        productos[cantidadProductos] = Producto(cantidadProductos, _nombre, _precio, msg.sender, false);
        
        // Disparar un evento
        emit ProductoCreado(cantidadProductos, _nombre, _precio, msg.sender, false);
    }

    function comprarProducto(uint _id) public payable {
        // Buscar el producto
        Producto memory _producto = productos[_id];

        // Buscar el duenio de ese producto
        address payable _vendedor = _producto.duenio;

        // Asegurarse de que el producto tenga un id valido
        require(_producto.id > 0 && _producto.id <= cantidadProductos);

        // Requerir que haya suficiente Ether en la transaccion
        require(msg.value >= _producto.precio);

        // Requerir que el producto no haya sido comprado todavia
        require(!_producto.comprado);

        // Require que el comprador no sea el vendedor
        require(_vendedor != msg.sender);

        // Transferir propiedad al comprador
        _producto.duenio = msg.sender;

        // Marcar como comprado
        _producto.comprado = true;

        // Actualizar el producto
        productos[_id] = _producto;

        // Pagarle al vendedor enviandole Ether
        address(_vendedor).transfer(msg.value);

        // Disparar un evento
        emit ProductoComprado(cantidadProductos, _producto.nombre, _producto.precio, msg.sender, true);
    }
}
