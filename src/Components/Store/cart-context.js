import React from "react";

const CartContext = React.createContext({
  total: 0,
  items: [],
  addItem: (item) => {},
  deleteItem: (id) => {},
});

export default CartContext;
