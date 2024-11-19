import React from 'react';
 // Assuming you have a CartDetails component
import { useSelector } from 'react-redux';
import OrderSummary from './OrderSummary';

const CartPage = () => {
  const { products } = useSelector((store) => store.cart);

  return (
    <section className="section__container product__container">
      <div className="flex lg:flex-row flex-col-reverse justify-center lg:space-x-40">
        <div className="space-y-5 lg:mt-0 mt-5">
          {products.length ? (
            products.map((product) => (
              <div key={product._id} className="cart-item">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            ))
          ) : (
            <p className="text-2xl text-red-500">No product found!</p>
          )}
        </div>
        <OrderSummary products={products} />

      </div>
    </section>
  );
};

export default CartPage;
