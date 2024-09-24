import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from './../../data/products.json';
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Ensure categoryName is a string before calling toLowerCase()
    const filtered = products.filter((product) =>
      product.category.toLowerCase() === (categoryName || '').toLowerCase()
    );
    setFilteredProducts(filtered);
    console.log('Filtered Products:', filtered); // Log the filtered products
  }, [categoryName])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Added empty dependency array to run this effect only once

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          lo b b hhhhh nnnnn nnnnnn hhhhhh loras,
        </p>
      </section>

      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
