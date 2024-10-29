import React from 'react';
import CartDetails from './CartModal';
import { useSelector } from 'react-redux';
import OrderSummary from './OrderSummary';

const CartPage = () => {
  const products = useSelector((store) => store.cart.products);

  return (
    <section className="section__container product__container">
      <div className="flex lg:flex-row flex-col-reverse justify-center lg:space-x-40">
        <div className="space-y-5 lg:mt-0 mt-5">
          {products.length ? (
            products.map((product) => (
              <CartDetails key={product._id} product={product} /> // Make sure CartDetails receives individual product data
            ))
          ) : (
            <p className="text-2xl text-red-500">No product found!</p>
          )}
        </div>
        <OrderSummary products={products} /> {/* Pass products to OrderSummary */}
      </div>
    </section>
  );
};

export default CartPage;
