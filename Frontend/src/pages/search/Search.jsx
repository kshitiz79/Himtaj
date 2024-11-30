import  { useState } from 'react';
import { useSearchProductsQuery } from './../../redux/features/products/productsApi';
import ProductCards from '../shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: filteredProducts = [], error, isLoading } = useSearchProductsQuery(searchQuery, {
    skip: !searchQuery, 
  });

  const handleSearch = () => {
    
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Page</h2>
        <p className="section__subheader">Find products by name or description</p>
      </section>

      <section className='section__container'>
        <div className='w-full mb-12 flex flex-cols md:flex-row items-center justify-center gap-4'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-bar w-full max-w-4xl p-2 border rounded'
            placeholder='Search for products...'
          />
          <button
            onClick={handleSearch}
            className='search-button w-1/3 md:w-auto py-2 px-8 bg-primary text-white rounded '
          >
            Search
          </button>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading products. Please try again later.</p>}
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
