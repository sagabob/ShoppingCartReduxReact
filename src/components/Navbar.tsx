import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Navbar = () => {
  const { amount } = useSelector((store: RootState) => store.cart);
  return (
    <>
      <nav>
        <div className="nav-center">
          <h3>Tdp Shop</h3>
          <div className="nav-container">
            <ShoppingBagIcon strokeWidth={2} />
            <div className="amount-container">
              <p className="total-amount">{amount}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
