
import { useState } from "react";
import { useFetchTrendingProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "./ProductCards";

const Trending = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { data: products = [], error, isLoading } = useFetchTrendingProductsQuery();

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading trending products.</p>;

  return (
    <section className="section__container2 product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the hottest picks: our handpicked selection of trending products.
      </p>

      <div className="mt-1">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      <div className="product__btn mt-4">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Trending;
