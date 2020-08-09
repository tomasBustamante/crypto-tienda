import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Button, Table, Typography } from "antd";

const { Title } = Typography;

const Main = ({ productos, crearProducto, comprarProducto }) => {
  const onFinish = (values) => {
    const { nombreProducto, precioProducto } = values;
    const precio = window.web3.utils.toWei(precioProducto.toString(), "Ether");
    crearProducto(nombreProducto, precio);
  };

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
      render: (text, record) => (
        <Button
          size="small"
          disabled={record.purchased}
          onClick={(event) => {
            comprarProducto(event.target.name, event.target.value);
          }}
        >
          Comprar
        </Button>
      ),
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
      <Title style={{ margin: "16px 0", textAlign: "center" }}>
        Crypto Tienda
      </Title>
      <div id="content" className="site-layout-content">
        <Title level={2}>Agregar producto</Title>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Nombre del producto"
            name="nombreProducto"
            rules={[
              { required: true, message: "¡Por favor ingresá el nombre!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Precio del producto"
            name="precioProducto"
            rules={[
              {
                required: true,
                message: "¡Por favor ingresá un valor numérico en el precio!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Agregar producto
            </Button>
          </Form.Item>
        </Form>
        <p>&nbsp;</p>
        <Title level={2}>Comprar producto</Title>
        <Table
          columns={columns}
          dataSource={rows}
          pagination={{ position: ["bottomCenter"] }}
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
  crearProducto: PropTypes.func,
  comprarProducto: PropTypes.func,
};

export default Main;
