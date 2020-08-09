import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";

const Navbar = ({ account }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={["index"]}
    selectedKeys={[]}
    style={{ lineHeight: "64px" }}
  >
    <Menu.Item key="index">
      <a href="/">Crypto Tienda</a>
    </Menu.Item>
    <Menu.Item style={{ float: "right" }} key="account">
      {account}
    </Menu.Item>
  </Menu>
);

Navbar.propTypes = {
  account: PropTypes.string.isRequired,
};

export default Navbar;
