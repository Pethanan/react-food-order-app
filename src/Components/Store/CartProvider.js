import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    return {
      items: updatedItems,
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    };
  }
  if (action.type === "DELETE_ITEM") {
    const toBeUpdatedItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const toBeUpdatedItem = state.items[toBeUpdatedItemIndex];
    const updatedTotalAmount = state.totalAmount - toBeUpdatedItem.price;

    let updatedItems;

    if (toBeUpdatedItem.amount > 1) {
      const updatedItem = {
        ...toBeUpdatedItem,
        amount: toBeUpdatedItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[toBeUpdatedItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return state;
};

const ContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    console.log("addfn clicked");
    dispatchCartAction({ type: "ADD_TO_CART", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    console.log("rem fn clicked");
    dispatchCartAction({ type: "DELETE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default ContextProvider;
