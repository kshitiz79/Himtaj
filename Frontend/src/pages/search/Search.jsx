import {useState }from 'react'

import productData from "../../data/products.json"
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const [searchQuery,setSearchQuery] = useState('');
    const[filteredProducts,setFilteredProducts] = useState(productData )

const handleSearch = () =>{
  const query = searchQuery.toLowerCase();
 
  const filtered = productData.filter(product => product.name.toLowerCase().includes (query) || product.description.toLowerCase().includes(query))

setFilteredProducts(filtered);
}



  return (
    <>
    <section className="section__container bg-primary-light">
    <h2 className="section__header capitalize">Search Page</h2>
    <p className="section__subheader">
      lo b b hhhhh nnnnn nnnnnn hhhhhh loras,
    </p>
  </section>


  <section className='section__container'>
    <div className='w-full mb-12 flex flex-cols md:flex-row items-center justify-center gap-4' >
      <input type='text'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className='search-bar w-full max-w-4xl p-2 border rounded'
      placeholder='Search for products...'/>
      <button onClick= {handleSearch}
        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded '>
        Search
      </button>
      </div>
        
        <ProductCards products={filteredProducts}/>

  </section>
  </>
  )
}

export default Search