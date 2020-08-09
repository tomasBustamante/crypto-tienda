import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Button, Typography } from "antd";

const { Title } = Typography;

const AltaProductos = ({ crearProducto }) => {
  const onFinish = (values) => {
    const { nombreProducto, precioProducto } = values;
    const precio = window.web3.utils.toWei(precioProducto.toString(), "Ether");
    crearProducto(nombreProducto, precio);
  };

  return (
    <>
      <Title level={2}>Agregar producto</Title>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 8 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nombre del producto"
          name="nombreProducto"
          rules={[{ required: true, message: "¡Por favor ingresá el nombre!" }]}
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
        <Form.Item wrapperCol={{ offset: 5, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Agregar producto
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

AltaProductos.propTypes = {
  crearProducto: PropTypes.func.isRequired,
};

export default AltaProductos;
