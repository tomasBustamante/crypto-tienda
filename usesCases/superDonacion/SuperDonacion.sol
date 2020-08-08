pragma solidity ^0.5.0;

contract SuperDonacion {

    mapping(address => uint) donaciones;
    address payable duenio;

    constructor() public {
        duenio = msg.sender;
        donaciones[duenio] = 20000;
    }

    function verSaldoAcumulado() external view returns(uint) {
        return address(this).balance;
    }

    function donar() external payable {
        require(msg.value > 5000 wei,"La donacion minima es de 5000 wei");
        donaciones[msg.sender] += msg.value;

        if (donaciones[msg.sender] > donaciones[duenio]) {
            duenio = msg.sender;
        }
    }

    function obtenerMiDonacion() external view returns(uint) {
        return donaciones[msg.sender];
    }

    function retirarSaldoAcumulado() external esElDuenio() {
        duenio.transfer(address(this).balance);
    }

    modifier esElDuenio() {
        require(msg.sender == duenio, "Tu no eres el duenio, no puedes retirar el dinero acumulado");
        _;
    }

    function quienEsElDuenio() external view returns(address) {
        return duenio;
    }
}