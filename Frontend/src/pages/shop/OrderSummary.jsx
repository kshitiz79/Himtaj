
import {  useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";


const OrderSummary = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const { tax, taxRate, grandTotal, totalPrice, selectedItems } = useSelector((store) => store.cart)
  
  return (

    
    <div className=" bg-primary-light mt-5 rounded text-base">
    <div className="px-6 py-4 space-y-5">
      <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
      <p className="text-dark mt-2">
          Selected Items : {selectedItems}
        </p>
        <p className="text-dark mt-2">
          Total Price : RS {totalPrice.toFixed(2)}
        </p>
        <p className="text-dark mt-2">
          Tax ({taxRate * 100}%): Rs {tax.toFixed(2)}
        </p>
        <h3 className="font-semibold text-dark mt-4">
          Grand Total Rs {grandTotal.toFixed(2)}
        </h3>
      </div>
      <div className="px-4 pb-6">
        {" "}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
          className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4"
        >
          <span className="mr-2">Clear Cart</span>

          <i className="ri-delete-bin-7-line"></i>
        </button>
        <button
          
          className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center"
        >
          <span className="mr-2">Proceed Checkout</span>
          <i className="ri-bank-card-line"></i>
        </button>
      </div>
      </div>
  )
}

export default OrderSummary