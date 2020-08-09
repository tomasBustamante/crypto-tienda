import "./styles.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CryptoTienda from "./contracts/CryptoTienda.json";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Main from "./Main";

const { Header, Content } = Layout;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [contrato, setContrato] = useState();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      // Cargar account
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const networkData = CryptoTienda.networks[networkId];
      if (networkData) {
        const cryptoTienda = new web3.eth.Contract(
          CryptoTienda.abi,
          networkData.address
        );
        setContrato(cryptoTienda);
        const cantidadProductos = await cryptoTienda.methods
          .cantidadProductos()
          .call();
        // Cargar productos
        for (let i = 1; i <= cantidadProductos; i++) {
          const producto = await cryptoTienda.methods.productos(i).call();
          setProductos([...productos, producto]);
        }
        setLoading(false);
      } else {
        window.alert("CryptoTienda contract not deployed to detected network.");
      }
    };
    loadWeb3();
    loadBlockchainData();
  }, []);

  const crearProducto = (nombre, precio) => {
    setLoading(true);
    contrato.methods
      .crearProducto(nombre, precio)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const comprarProducto = (id, precio) => {
    setLoading(true);
    contrato.methods
      .comprarProducto(id)
      .send({ from: account, value: precio })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  return (
    <Layout className="Layout">
      <Header>
        <Navbar account={account} />
      </Header>
      <Content className="Content">
        {loading ? (
          <div id="loader" className="text-center">
            <p className="text-center">Loading...</p>
          </div>
        ) : (
          <Main
            productos={productos}
            crearProducto={crearProducto}
            comprarProducto={comprarProducto}
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;
