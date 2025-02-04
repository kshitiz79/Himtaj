import  { useEffect, useMemo, useState } from "react";

import { Link, useParams } from "react-router-dom";
import RatingStar from "../../../components/RatingStar";
import {  useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import ReviewsCard from "../reviews/ReviewsCard";
import { useAddItemToCartMutation } from "../../../redux/features/cart/cartApi";
import EstimatedDeliverySection from "./EstimatedDeliverySection";
import RecommendedProducts from "./Recommendtaion/RecommendedProducts";
import colorOptions from "./../../../utils/coloroption";






const SingleProduct = ({ refetchCart }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const [addItemToCart] = useAddItemToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const [isShippingOpen, setShippingOpen] = useState(false);
  const singleProduct = useMemo(() => data?.product || {}, [data]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    console.log('Fetched single product:', data);
}, [data]);



  useEffect(() => {
    setCurrentImage(singleProduct.image);
  }, [singleProduct]);


  const productReviews = data?.reviews || [];
  const [currentImage, setCurrentImage] = useState(singleProduct.image);

  useEffect(() => {
    // Fetch recommended products from your API or define them manually
    const fetchRecommendedProducts = async () => {
      // Example: Replace this with your fetch logic
      const response = await fetch('/api/recommended-products'); // Adjust the endpoint
      const data = await response.json();
      setRecommendedProducts(data);
    };

    fetchRecommendedProducts();
  }, []);
  useEffect(() => {
    console.log("Fetched Product Data:", data);
  }, [data]);

  useEffect(() => {
    console.log("Single Product Data:", singleProduct);
  }, [singleProduct]);
  



  const handleAddToCart = async () => {
    const product = {
      productId: singleProduct._id,
      name: singleProduct.name,
      price: singleProduct.price,
      image: singleProduct.image,
      quantity: 1,
      metal:singleProduct.metal,
      userId,
    };


 
    


    try {
      const response = await addItemToCart(product).unwrap();
      console.log("Add to cart response:", response);
      if (typeof refetchCart === "function") {
        refetchCart();
      }
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <p>Error loading product. Please try again later.</p>;


  const productColors = singleProduct.colors || [];
  const toggleDescription = () => {
    setDescriptionOpen(prevState => !prevState);
  };

  const toggleShipping = () => {
    setShippingOpen(prevState => !prevState);
  };

  const formatDescription = (description) => {
    // Split the description into paragraphs
    const paragraphs = description.split('\n').filter(p => p.trim() !== "");
  
    return paragraphs.map((paragraph, index) => {
      // Check if the paragraph starts with a bullet point
      if (paragraph.startsWith('*') || paragraph.startsWith('-')) {
        return (
          <li key={index} className="mb-1">{paragraph.replace(/^[*-]\s*/, '').trim()}</li>
        );
      } else if (paragraph.startsWith('The Design:')) {
        return (
          <h3 key={index} className="font-semibold mt-4">{paragraph}</h3>
        );
      } else if (paragraph.startsWith('Styling Tip:')) {
        return (
          <h3 key={index} className="font-semibold mt-4">{paragraph}</h3>
        );
      } else {
        return (
          <p key={index} className="mt-2">{paragraph}</p>
        );
      }
    });
  };

  return (
    <>
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
        <div className="mb-4 flex justify-center">
      <img
        src={currentImage || "/path/to/placeholder.jpg"}
        alt={singleProduct.name || "Product image"}
        className="rounded-lg w-3/4  h-7rem object-cover border-red-500" // Ensure the main image uses object-cover
      />
    </div>


          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto justify-center">
            <img
              src={singleProduct.image}
              alt="Primary"
              onClick={() => setCurrentImage(singleProduct.image)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                currentImage === singleProduct.image ? "border-gray-800" : "border-transparent"
              } hover:border-gray-800`}
            />
            {singleProduct.additionalImages?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Reference ${index + 1}`}
                onClick={() => setCurrentImage(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  currentImage === img ? "border-gray-800" : "border-transparent"
                } hover:border-gray-800`}
              />
            ))}
          </div>
        </div>







        {/* Product Details Section */}

        <div className="w-full md:w-1/2">
      

        <div className="flex items-center mb-2">
  
  <p className="text-3xl text-primary mr-2 "> <strong> Rs {singleProduct.price}</strong></p>
      {singleProduct.oldPrice && singleProduct.oldPrice !== singleProduct.price && (
          <p className="text-lg text-gray-500 line-through"> Rs {singleProduct.oldPrice}</p>
      )}
  </div>




        <h1 className="text-3xl font-semibold ">{singleProduct.name}</h1>



        



        <div className="mt-4 space-y-2">
  <p><strong>Metal:</strong> {singleProduct.metal}</p>

  {/* Display Multiple Colors */}
  {/* Display Multiple Colors */}
{/* Colors Section */}
<div className="mt-4 flex gap-2">
  <h4 className="text-lg font-semibold">Available Colors:</h4>
  <div className="flex gap-2">
    {productColors.map((color, index) => (
      <div key={index} className="flex items-center gap-1">
        <div
          style={{
            backgroundColor: color.code,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "1px solid #ccc",
          }}
          title={color.value} // Optional: tooltip for the color name
        />
      </div>
    ))}
  </div>
</div>



  {/* Display Size */}
  {singleProduct.size && <p><strong>Available Size:</strong> {singleProduct.size}</p>}

  {/* Display Category */}
  <p><strong>Category:</strong> {singleProduct.category}</p>

  {/* Display Rating */}
  <div className="flex items-center gap-1">
    <strong>Rating:</strong> <RatingStar rating={singleProduct.rating} />
  </div>
</div>

          <EstimatedDeliverySection/>
          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
            disabled={isLoading || error}
          >
            Add to Cart
          </button>



          <div className="mt-12 text-gray-700">
        <button
          onClick={toggleDescription}
          className="flex justify-between items-center w-3/5 py-2 font-semibold text-left text-primary hover:text-primary-dark"
        >
          <span>Description</span>
          <span>{isDescriptionOpen ? '−' : '+'}</span>
        </button>
        {isDescriptionOpen && (
          <ul className="list-disc ml-5 mt-2">
            {formatDescription(singleProduct.description)}
          </ul>
        )}
      </div>
      <div className="mt-3 w-3/5">
  <hr className="border-gray-300" />


</div>



      <div className="mt-5 text-gray-700">
        <button
          onClick={toggleShipping}
          className="flex justify-between w-3/5 items-center  py-2 font-semibold text-left text-primary hover:text-primary-dark"
        >
          <span>Shipping</span>
          <span>{isShippingOpen ? '−' : '+'}</span>
        </button>
        {isShippingOpen && (
          <div className="ml-5 mt-2">
               <p>Free express shipping</p>
            <p>Standard shipping: 3-5 business days.</p>
            <p>Express shipping: 1-2 business days.</p>
            <p>Free shipping on orders above Rs. 1500.</p>
          </div>
        )}
      </div>
      <div className="mt-3 w-3/5">
  <hr className="border-gray-300" />
</div>
<RecommendedProducts products={recommendedProducts} />
        </div>

    
      </div>
      </section>




      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>

    </>
  );
};

export default SingleProduct;
