const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    return (
      <div className="space-y-5 flex-shrink-0">
        <h3>Filter</h3>
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Category</h4>
          <hr />
          {filters.categories.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                id="category"
                value={category}
                checked={filtersState.category === category}
                onChange={(e) =>
                  setFiltersState({ ...filtersState, category: e.target.value })
                }
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default ShopFiltering;
  
