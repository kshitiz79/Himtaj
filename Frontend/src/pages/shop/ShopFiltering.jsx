


const ShopFiltering = ({ filters , filtersState , setFiltersState , clearFilters }) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filter</h3>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              id={`category-${category}`} // Unique ID
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-4">{category}</span>
          </label>
        ))}
      </div>

      {/* Color */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color}>
            <input
              type="radio"
              name="color" 
              id={`color-${color}`} // Unique ID
              value={color}
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />
            <span className="ml-4">{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label}>
            <input
              type="radio"
              name="priceRange"
              id={`priceRange-${range.label}`} // Unique ID
              value={range.label}
              checked={filtersState.priceRange.label === range.label}
              onChange={() =>
                setFiltersState({ ...filtersState, priceRange: range })
              }
            />
            <span className="ml-4">{range.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="bg-primary py-1 px-4 text-white rounded"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
