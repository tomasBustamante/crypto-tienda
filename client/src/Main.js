import React, { useState } from "react";
import PropTypes from "prop-types";

const Main = ({ productos, crearProducto, comprarProducto }) => {
  const [nombreProducto, setNombreProducto] = useState();
  const [precioProducto, setPrecioProducto] = useState();

  return (
    <div id="content">
      <h1>Agregar producto</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const name = nombreProducto.value;
          const precio = window.web3.utils.toWei(
            precioProducto.value.toString(),
            "Ether"
          );
          crearProducto(name, precio);
        }}
      >
        <div className="form-group mr-sm-2">
          <input
            id="nombreProducto"
            type="text"
            ref={(input) => {
              setNombreProducto(input);
            }}
            className="form-control"
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="precioProducto"
            type="text"
            ref={(input) => {
              setPrecioProducto(input);
            }}
            className="form-control"
            placeholder="Precio del producto"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar producto
        </button>
      </form>
      <p>&nbsp;</p>
      <h2>Comprar producto</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Dueño</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          {productos.map((producto, key) => {
            return (
              <tr key={key}>
                <th scope="row">{producto.id.toString()}</th>
                <td>{producto.nombre}</td>
                <td>
                  {window.web3.utils.fromWei(
                    producto.precio.toString(),
                    "Ether"
                  )}{" "}
                  Eth
                </td>
                <td>{producto.duenio}</td>
                <td>
                  {!producto.purchased ? (
                    <button
                      name={producto.id}
                      value={producto.precio}
                      onClick={(event) => {
                        comprarProducto(event.target.name, event.target.value);
                      }}
                    >
                      Comprar
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Main.propTypes = {
  productos: PropTypes.arrayOf({
    id: PropTypes.string,
    nombre: PropTypes.string,
    duenio: PropTypes.string,
    precio: PropTypes.number,
  }).isRequired,
  crearProducto: PropTypes.func,
  comprarProducto: PropTypes.func,
};

export default Main;
