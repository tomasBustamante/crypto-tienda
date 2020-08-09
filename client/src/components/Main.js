import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import AltaProductos from "./AltaProductos";
import TablaProductos from "./TablaProductos";

const { Title } = Typography;

const Main = ({ productos, crearProducto, comprarProducto }) => {
  return (
    <>
      <Title style={{ margin: "16px 0", textAlign: "center" }}>
        Crypto Tienda
      </Title>
      <div id="content" className="site-layout-content">
        <AltaProductos crearProducto={crearProducto} />
        <p>&nbsp;</p>
        <TablaProductos
          productos={productos}
          comprarProducto={comprarProducto}
        />
      </div>
    </>
  );
};

Main.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      nombre: PropTypes.string,
      duenio: PropTypes.string,
      precio: PropTypes.string,
    })
  ).isRequired,
  crearProducto: PropTypes.func.isRequired,
  comprarProducto: PropTypes.func.isRequired,
};

export default Main;
