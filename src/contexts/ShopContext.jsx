import { createContext, useState } from "react";
import AllProducts from "../components/data/All_products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < AllProducts.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());
  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = AllProducts.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
  };
  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const value = {
    getTotalCartItem,
    getTotalCartAmount,
    AllProducts,
    cartItem,
    addToCart,
    removeFromCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
