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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Category images mapping
  const categoryImages = {
    "Earrings": '/1.png',
    "Necklaces": '/2.png',
    "Studs": '/3.png',
    "Bracelets": '/4.png',
    "Rings": '/5.png',
    "Anklets": '/6.png',
    "Idols & Coins": '/7,png',
    "Men's Jewellery": '/8.png',
    "Kid's Jewellery": '/9.png',
    "Bridal Jewellery": '/10.png',
    "Fashion Jewellery": '/11.png',
    "Gold Jewellery": '/12.png',
    "all": '/defau' // Default image for 'all' or unspecified categories
  };

  // Get image URL based on categoryName
  const categoryImage =
    categoryImages[categoryName] || '/images/default.jpg'; // Fallback to default

  return (
    <>
      <section >
        <div className="relative">
          <img
            src={categoryImage}
            alt={`${categoryName} banner`}
            className="w-full h-full  rounded-lg"
          />
       
        </div>
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
