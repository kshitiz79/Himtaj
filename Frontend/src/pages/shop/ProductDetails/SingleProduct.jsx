import React from "react";
import { Link, useParams } from "react-router-dom";
import RatingStar from "../../../components/RatingStar";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import ReviewsCard from "../reviews/ReviewsCard";
import { useAddItemToCartMutation } from "../../../redux/features/cart/cartApi";

const SingleProduct = ({ refetchCart }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const [addItemToCart] = useAddItemToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = async () => {
    const product = {
      productId: singleProduct._id,
      name: singleProduct.name,
      price: singleProduct.price,
      image: singleProduct.image,
      quantity: 1,
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

  return (
    <>
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={singleProduct.image || "/path/to/placeholder.jpg"}
              alt={singleProduct.name || "Product image"}
              className="rounded-md w-full h-auto"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct.name}
            </h3>
            <p className="text-xl text-primary mb-4">
              Rs {singleProduct.price}
              {singleProduct.oldPrice &&
                singleProduct.oldPrice !== singleProduct.price && (
                  <s className="ml-2 text-gray-500">
                    ${singleProduct.oldPrice}
                  </s>
                )}
            </p>
            <p className="text-gray-700 mb-4"> <strong>Description:</strong> {singleProduct.description}</p>

            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category:</strong>  {singleProduct.category}
              </p>
              <p>
                <strong>Color:</strong>  {singleProduct.color}
              </p>
              {singleProduct.size && (
                <p>
                  <strong>Available Size:</strong>  {singleProduct.size}
                </p>
              )}
              <div className="flex gap-1 items-center">
                <strong>Rating:</strong>
                 <RatingStar rating={singleProduct.rating} />
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
              disabled={isLoading || error}
            >
              Add to Cart
            </button>
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
