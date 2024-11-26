import React, { useState } from 'react';
import { useSearchProductsQuery } from './../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [manualSearchQuery, setManualSearchQuery] = useState(''); // For button-triggered searches

  // Query products with either live search or manual search
  const { data: filteredProducts = [], error, isLoading } = useSearchProductsQuery(
    searchQuery || manualSearchQuery, // Use live or manual query
    {
      skip: !(searchQuery || manualSearchQuery), // Skip query if both are empty
    }
  );

  const handleSearch = () => {
    setManualSearchQuery(searchQuery); // Trigger a new search on button click
    setIsSearchOpen(!!searchQuery); // Open the results dropdown if there's input
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setManualSearchQuery(''); // Clear manual search query
  };

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <nav className="navbar text-white p-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value); // Update live query
            setIsSearchOpen(!!e.target.value); // Open results dropdown if there's input
          }}
          className="search-bar w-96 p-2 border rounded-full text-black"
          placeholder="     Search for products..."
        />
        <button
          onClick={handleSearch}
          className="search-button py-2 px-4 bg-white text-primary rounded-full ml-2"
        >
          Search
        </button>

        {/* Pop-up for Search Results */}
        {isSearchOpen && (
          <div className="absolute top-12 left-0 w-[24rem] bg-white text-black shadow-lg rounded p-4 z-50">
            <button
              onClick={handleCloseSearch}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading products. Please try again later.</p>}
            {!isLoading && !error && filteredProducts.length === 0 && (
              <p>No products found.</p>
            )}
            <div className="product-results max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 mb-4 cursor-pointer"
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
    </nav>
  );
};

export default Search;
