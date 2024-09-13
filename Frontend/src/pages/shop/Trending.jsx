import { useState } from "react";
import products from "../../data/products.json";
import ProductCards from "./ProductCards";

const Trending = () => {

    const [visibleProducts, setvisibleProducts] = useState(8);

    const loadMoreProducts = () =>{
        setvisibleProducts(prevCount => prevCount +4)
    }

  return (
   <section className='section__container product__container'>
    <h2 className='section__header'>
Treanding Products
    </h2>
<p className='section__subheader mb-12'>Lorem ipsum dolor sit amet, imus cum id repudiandae ab, dignissimos eligendi distinctio minuFugit, quia reiciendis?</p>

< div className="mt-16">
<ProductCards  products={products.slice(0,visibleProducts)}/>
</div>
<div className='product__btn'>
    {
        visibleProducts< products.length &&(
            <button className='btn' onClick={loadMoreProducts}>Load More</button>
        )
    }

</div>
   </section>
  )
}

export default Trending