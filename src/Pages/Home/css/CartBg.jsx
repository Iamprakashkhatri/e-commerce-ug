import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";

function CartBg() {
  return (
    <>
      <ShoppingCartOutlined
        style={{
          position: "absolute",
          marginLeft: "10px",
          marginTop: "50px",
          fontSize: "70px",
          color: "#faa063",
          transform: `rotate(25deg)`,
        }}
      />
      <ShoppingCartOutlined
        style={{
          position: "absolute",
          marginLeft: "400px",
          marginBottom: "0px",
          fontSize: "50px",
          color: "#faa063",
          transform: `rotate(15deg)`,
        }}
      />
      <ShoppingCartOutlined
        style={{
          position: "absolute",
          marginLeft: "200px",
          fontSize: "110px",
          color: "#faa063",
          transform: `rotate(-30deg)`,
        }}
      />
      <ShoppingCartOutlined
        style={{
          position: "absolute",
          marginLeft: "400px",
          marginTop: "0px",
          fontSize: "50px",
          color: "#faa063",
          transform: `rotate(15deg)`,
        }}
      />
    </>
  );
}

export default CartBg;
