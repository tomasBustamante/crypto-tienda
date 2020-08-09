import React from "react";
import PropTypes from "prop-types";
import { Tabs, Typography, Spin } from "antd";
import AltaProductos from "./AltaProductos";
import TablaProductos from "./TablaProductos";

const { Title } = Typography;
const { TabPane } = Tabs;

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
          <Tabs defaultActiveKey="AltaProductos" style={{ height: 320 }}>
            <TabPane key="AltaProductos" tab="Alta de Productos">
              <AltaProductos crearProducto={crearProducto} />
            </TabPane>
            <TabPane key="TablaProductos" tab="Compra de productos">
              <TablaProductos
                productos={productos}
                comprarProducto={comprarProducto}
              />
            </TabPane>
          </Tabs>
          <p>&nbsp;</p>
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
