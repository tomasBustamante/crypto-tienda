pragma solidity ^0.5.0;

// Solidity - Grupo 1
contract Hello {
    string saludo;

    constructor() public {
        saludo = "Hola";
    }

    function get() public view returns (string memory) {
        return saludo;
    }

    function set(string memory _saludo) public {
        saludo = _saludo;
    }
}
