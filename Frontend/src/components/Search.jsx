import React, { useState } from "react";
import { useSearchProductsQuery } from "../redux/features/products/productsApi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Query products based on search query
  const { data: filteredProducts = [], error, isLoading } = useSearchProductsQuery(
    searchQuery,
    { skip: !searchQuery } // Skip query if search query is empty
  );

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
    setIsSearchOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchOpen(!!e.target.value);
          }}
          className="w-80 p-2 pl-10 border rounded-full text-gray-800 border-gray-300 focus:outline-none focus:border-primary"
          placeholder="Search product..."
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <i className="fas fa-search"></i>
        </span>
      </div>
      {isSearchOpen && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-4 z-50">
          <button
            onClick={handleSearchClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading products. Please try again later.</p>}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}
          <div className="max-h-96  overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-gray-500">Rs {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
