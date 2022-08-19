import {
  removeItem,
  increase,
  decrease,
} from "../store/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { CartItem } from "../store/features/cart/cartType";

const CartItemContainer = (item: CartItem) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={item.img} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <h4 className="item-price">${item.price}</h4>
        <button
          className="remove-btn"
          onClick={() => {
            dispatch(removeItem(item));
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => {
            dispatch(increase(item));
          }}
        >
          <ChevronUpIcon />
        </button>
        <p className="amount">{item.amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (item.amount === 1) {
              dispatch(removeItem(item));
              return;
            }
            dispatch(decrease(item));
          }}
        >
          <ChevronDownIcon />
        </button>
      </div>
    </article>
  );
};
export default CartItemContainer;
