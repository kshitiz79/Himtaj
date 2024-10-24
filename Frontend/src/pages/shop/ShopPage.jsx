import React, { useState, useEffect, useCallback } from "react";

import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';


const filters = {
  categories: [
    "All", "Earrings", "Rings", "Anklets", "Necklaces", "Jewellery Sets", "Bracelets", 
    "Men's Jewellery", "Charms & Pendants", "Idols & Coins", "Bangles", "Nose Pins"
  ],
  colors: ["All", "Silver", "White", "White Gold"],
  sizes: ["7", "8", "9", "10", "11", "12"], 
  priceRanges: [
    { label: "All", min: 0, max: Infinity }, // Added "All" option
    { label: "Under RS50", min: 0, max: 50 },
    { label: "Under RS100", min: 50, max: 100 },
    { label: "Under RS200", min: 100, max: 200 },
    { label: "Over RS200", min: 200, max: Infinity },
  ],

};

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
      category: 'all',
      color: 'all',
      priceRange: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
      category: category !== 'all' ? category : '',
      color: color !== 'all' ? color : '',
      minPrice: isNaN(minPrice) ? '' : minPrice,
      maxPrice: isNaN(maxPrice) ? '' : maxPrice,
      page: currentPage,
      limit: productsPerPage
  });


  const handlePageChange = (pageNumber) => {
      console.log(`Changing to page: ${pageNumber}`);
      if (pageNumber > 0 && pageNumber <= totalPages) {
          setCurrentPage(pageNumber);
      }
  };

  const clearFilters = () => {
      setFiltersState({
          category: 'all',
          color: 'all',
          priceRange: ''
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
      <>
          <section className="section__container rounded bg-primary-light">
              <h2 className="section__header">Shop Page</h2>
              <p className="section__subheader">
                  Discover the Hottest Picks: Elevate Your Style with Our Curated
                  Collection of Trending Women's Fashion Products.
              </p>
          </section>
          <section className='section__container'>
              <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                  {/* left side */}
                  <ShopFiltering
                      filters={filters}
                      filtersState={filtersState}
                      setFiltersState={setFiltersState}
                      clearFilters={clearFilters}
                  />

                  {/* right side */}
                  <div>
                      <h3 className='text-xl font-medium mb-4'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
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
