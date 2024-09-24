import React, { useState, useEffect } from "react";
import productData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";

const filters = {
  categories: ["all", "accessories", "dress", "cosmetics"],
  colors: ["all", "black", "red", "blue"],

  priceRanges: [
    { label: "Under RS50", min: 0, max: 50 },
    { label: "Under RS100", min: 50, max: 100 },
    { label: "Under RS200", min: 100, max: 200 },
    { label: "Over RS200", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: filters.priceRanges[0], // Default to the first price range
  });

  const applyFilters = () => {
    let filteredProducts = productData;

    // Filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    // Filter by color
    if (filtersState.color && filtersState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filtersState.color
      );
    }

    // Filter by price range
    if (filtersState.priceRange) {
      const { min, max } = filtersState.priceRange;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setProducts(filteredProducts);
  };

  // Apply filters whenever the filter state changes
  useEffect(() => {
    applyFilters()
  }, [filtersState]);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: filters.priceRanges[0], // Reset to the default price range
    });
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop page</h2>
        <p className="section__subheader">
          Browse our products and find what suits you best.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Left side (filters) */}
          <ShopFiltering filters={filters} 
            filtersState={filtersState}  // Corrected here
           setFiltersState={setFiltersState} 
           clearFilters={clearFilters}/>

          {/* Right side (products) */}
          <div>
            <h3 className="text-xl font-medium mb-4">Products Available</h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;    
