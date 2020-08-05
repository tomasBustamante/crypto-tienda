import React, { Component } from "react";
import Web3 from "web3";
// import logo from "./logo.png";
import "./App.css";
import CryptoTienda from "./contracts/CryptoTienda.json";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
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
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoTienda.networks[networkId];
    if (networkData) {
      const cryptoTienda = new web3.eth.Contract(
        CryptoTienda.abi,
        networkData.address
      );
      this.setState({ cryptoTienda });
      const cantidadProductos = await cryptoTienda.methods.cantidadProductos().call();
      this.setState({ cantidadProductos });
      // Load products
      for (var i = 1; i <= cantidadProductos; i++) {
        const product = await cryptoTienda.methods.productos(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("CryptoTienda contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      cantidadProductos: 0,
      products: [],
      loading: true,
    };

    this.crearProducto = this.crearProducto.bind(this);
    this.comprarProducto = this.comprarProducto.bind(this);
  }

  crearProducto(name, price) {
    this.setState({ loading: true });
    this.state.cryptoTienda.methods
      .crearProducto(name, price)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  comprarProducto(id, price) {
    this.setState({ loading: true });
    this.state.cryptoTienda.methods
      .comprarProducto(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <Main
                  products={this.state.products}
                  crearProducto={this.crearProducto}
                  comprarProducto={this.comprarProducto}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
