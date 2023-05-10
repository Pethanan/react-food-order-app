import { useState } from "react";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import ContextProvider from "./Components/Store/CartProvider";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const closeCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <ContextProvider>
      {isCartShown && <Cart onCloseCart={closeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </ContextProvider>
  );
}

export default App;
