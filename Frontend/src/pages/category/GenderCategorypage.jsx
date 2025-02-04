import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";

const GenderCategoryPage = () => {
  const { gender, categoryName } = useParams();

  // Use your single unified endpoint
  // Pass gender and category as query parameters
  const { data, error, isLoading } = useFetchAllProductsQuery({
    gender,
    category: categoryName,
    page: 1,
    limit: 50,
  });

  // Scroll to top on mount or when params change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gender, categoryName]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  // Adjust depending on your API response shape
  const products = data?.products || [];

  return (
    <div className="section__container">
      <h1 className="text-xl font-semibold mb-4">
        {gender} - {categoryName}
      </h1>

      {products.length > 0 ? (
        <ProductCards products={products} />
      ) : (
        <p>No products found for {gender} / {categoryName}.</p>
      )}
    </div>
  );
};

export default GenderCategoryPage;
