import { Link } from "react-router-dom";
import RatingStar from "../../components/RatingStar";

const ProductCards = ({ products }) => {
  console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product._id} className="product__card relative">
          <div>
            <Link to={`/shop/${product._id}`}>
              <img src={product.image} alt={product.name} />
            </Link>

            {/* Ensure the button is not hidden */}
            <div className="absolute top-3 right-3">
              <button>
              <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark "></i>{/* Ensure text color and size are set */}
              </button>
            </div>
          </div>
          <div className='product__card__content'>
            <h4>{product.name}</h4>
            <p>{product.price} {product.oldPrice ? <s>
              ${product?.oldPrice}</s> : null }</p>
              <RatingStar rating={product.rating}/>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;

