import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./store/features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
import { RootState, AppDispatch } from "./store/store";

function App() {
  const { cartItems, isLoading } = useSelector(
    (store: RootState) => store.cart
  );
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const dispatch = useDispatch();
  const appDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    appDispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
