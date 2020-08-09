import React from "react";
import PropTypes from "prop-types";
import { Typography, Spin } from "antd";
import AltaProductos from "./AltaProductos";
import TablaProductos from "./TablaProductos";

const { Title } = Typography;

const Main = ({ productos, crearProducto, comprarProducto, loading }) => (
  <>
    <Title style={{ margin: "16px 0", textAlign: "center" }}>
      Crypto Tienda
    </Title>
    <div id="content" className="site-layout-content">
      {loading && (
        <Spin style={{ display: "block" }} size="large" tip="Loading..." />
      )}
      {!loading && (
        <>
          <AltaProductos crearProducto={crearProducto} />
          <p>&nbsp;</p>
          <TablaProductos
            productos={productos}
            comprarProducto={comprarProducto}
          />
        </>
      )}
    </div>
  </>
);

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
  loading: PropTypes.bool,
};

export default Main;
