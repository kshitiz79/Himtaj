import React from 'react';

const RecommendedProducts = ({ products }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4">
            <img
              src={product.image || "/path/to/placeholder.jpg"}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-primary">Rs {product.price}</p>
            <button className="mt-2 bg-primary text-white rounded py-2 px-4 hover:bg-primary-dark">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
