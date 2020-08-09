import React from "react";
import PropTypes from "prop-types";
import { Button, Table, Typography } from "antd";

const { Title } = Typography;

const TablaProductos = ({ productos, comprarProducto }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Dueño",
      dataIndex: "duenio",
      key: "duenio",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => {
        const producto = productos.find(
          ({ id }) => record.id === id.toString()
        );
        return (
          <Button
            size="small"
            disabled={record.comprado}
            onClick={(event) => {
              comprarProducto(producto.id, producto.precio);
            }}
          >
            Comprar
          </Button>
        );
      },
    },
  ];

  const rows = productos.map(({ id, precio, ...rest }, key) => ({
    key,
    id: id.toString(),
    precio: `${window.web3.utils.fromWei(precio.toString(), "Ether")} Eth`,
    ...rest,
  }));

  return (
    <>
      <Title level={2}>Comprar producto</Title>
      <Table
        columns={columns}
        dataSource={rows}
        pagination={{ position: ["bottomCenter"] }}
        locale={{
          emptyText: <p>No hay productos disponibles.</p>,
        }}
      />
    </>
  );
};

TablaProductos.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      nombre: PropTypes.string,
      duenio: PropTypes.string,
      precio: PropTypes.string,
    })
  ).isRequired,
  comprarProducto: PropTypes.func.isRequired,
};

export default TablaProductos;
