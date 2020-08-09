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
        require(bytes(_nombre).length > 0);

        require(_precio > 0);

        cantidadProductos++;

        productos[cantidadProductos] = Producto(cantidadProductos, _nombre, _precio, msg.sender, false);
        
        emit ProductoCreado(cantidadProductos, _nombre, _precio, msg.sender, false);
    }

    function comprarProducto(uint _id) public payable {
        Producto memory _producto = productos[_id];

        address payable _vendedor = _producto.duenio;

        require(_producto.id > 0 && _producto.id <= cantidadProductos);

        require(msg.value >= _producto.precio);

        require(!_producto.comprado);

        require(_vendedor != msg.sender);

        _producto.duenio = msg.sender;

        _producto.comprado = true;

        productos[_id] = _producto;

        address(_vendedor).transfer(msg.value);

        emit ProductoComprado(cantidadProductos, _producto.nombre, _producto.precio, msg.sender, true);
    }
}
