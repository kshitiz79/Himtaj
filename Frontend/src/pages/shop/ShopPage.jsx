import React, { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: [
    "All", "Earrings", "Necklaces", "Studs", "Bracelets", "Chain","Rings", "Anklets",
    "Idols & Coins", "Men's Jewellery", "Kid's Jewellery", "Bridal Jewellery", "Fashion Jewellery", "Gold Jewellery ",
  ],
  colors: ["All", "Silver", "Gold", "Rose Gold"],
  priceRanges: [
    { label: "All", min: '', max: '' },
    { label: "Under RS 1500", min: 0, max: 1500 },
    { label: "Under RS 3000", min: 1500, max: 3000 },
    { label: "Under RS 5000", min: 3000, max: 5000 },
    { label: "Over RS 5000", min: 5000, max: '' },
  ],
};

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: 'All',
    color: 'All',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const { category, color, priceRange } = filtersState;

  // Determine filters for the query
  const categoryFilter = category !== 'All' ? category : '';
  const colorFilter = color !== 'All' ? color : '';

  let minPrice = '';
  let maxPrice = '';
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    if (!isNaN(min)) {
      minPrice = min;
    }
    // max might be empty for "Over RS 5000"
    if (!isNaN(max)) {
      maxPrice = max;
    }
  }

  const { data: { products = [], totalPages = 1, totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: categoryFilter || undefined,
    color: colorFilter || undefined,
    minPrice: minPrice !== '' ? minPrice : undefined,
    maxPrice: maxPrice !== '' ? maxPrice : undefined,
    page: currentPage,
    limit: productsPerPage
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const clearFilters = () => {
    setFiltersState({
      category: 'All',
      color: 'All',
      priceRange: ''
    });
    setCurrentPage(1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container3">
        <img 
          src="shoppage.png" 
          alt="Shop Page GIF" 
          className="w-full rounded" 
        />
      </section>
      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* Left Side (Filters) */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Right Side (Product Display) */}
          <div>
            <h3 className='text-xl font-medium mb-4'>
              Showing {products.length > 0 ? startProduct : 0} to {products.length > 0 ? endProduct : 0} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
