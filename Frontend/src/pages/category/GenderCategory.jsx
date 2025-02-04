import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../shop/ProductCards";
// Import the single fetch query (rather than fetchProductsByGender)
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const GenderPage = () => {
  const { gender } = useParams(); // "male" or "female" from the route

  // Validate the gender param or use undefined if invalid
  const validGender = gender === "male" || gender === "female" ? gender : undefined;

  // Fetch products using the unified endpoint
  // Pass `gender` in the query object
  const { data, error, isLoading } = useFetchAllProductsQuery({
    gender: validGender, // only pass if valid
    page: 1,
    limit: 50, // or whatever makes sense
    // ...you can include other filters too, like category, color, etc.
  });

  // Scroll to top when page loads or gender changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gender]);

  // Gender banner images
  const genderImages = {
    male: "/MenCollection.png",
    female: "/HerCollection.png",
  };

  // Fallback if `gender` is invalid or not recognized
  const genderImage = validGender
    ? genderImages[validGender]
    : "/images/default-gender-banner.jpg";

  return (
    <>
      <section className="w-full section__container3 flex items-center justify-center container">
        <div className="flex justify-center items-center">
          <img
            src={genderImage}
            alt={`${gender} products`}
            className="w-[100vw] h-full"
          />
        </div>
      </section>

      <div className="section__container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products.</p>
        ) : data?.products?.length > 0 ? (
          // Adjust if your data shape is { products, totalPages, ... }
          <ProductCards products={data.products} />
        ) : (
          <p>No products found for {gender}.</p>
        )}
      </div>
    </>
  );
};

export default GenderPage;
