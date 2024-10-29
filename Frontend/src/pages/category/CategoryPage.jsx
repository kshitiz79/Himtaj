import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Use the fetchAllProducts query, passing the category name
  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: categoryName !== 'all' ? categoryName : '', // Filter by category, or get all if 'all'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Scroll to the top when the page loads

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          {data?.products?.length > 0
            ? `Browse our selection of ${categoryName} products.`
            : `No products available for ${categoryName}.`}
        </p>
      </section>

      <div className="section__container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products.</p>
        ) : data?.products?.length > 0 ? (
          <ProductCards products={data.products} />
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
