import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../../../src/redux/features/products/productsApi';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Earrings', value: 'Earrings' },
    { label: 'Necklaces', value: 'Necklaces' },
    { label: 'Studs', value: 'Studs' },
    { label: 'Bracelets', value: 'Bracelets' },
    { label: 'Rings', value: 'Rings' },
    { label: 'Anklets', value: 'Anklets' },
    { label: 'Idols & Coins', value: 'Idols & Coins' },
    { label: "Men's Jewellery", value: "Men's Jewellery" },
    { label: 'Kid\'s Jewellery', value: 'Kid\'s Jewellery' },
    { label: 'Bridal Jewellery', value: 'Bridal Jewellery' },
    { label: 'Fashion Jewellery', value: 'Fashion Jewellery' },
    { label: 'Gold Jewellery', value: 'Gold Jewellery' },
    { label: 'Chain', value: 'Chain' }
];

const colorOptions = [
    { label: "Silver", value: "Silver", code: "#C4C4C4" },
    { label: "Rose Gold", value: "Rose Gold", code: "#DEA193" },
    { label: "Gold", value: "Gold", code: "#EOEAA3E" },
    { label: "Platinum", value: "Platinum", code: "#E5E4E2" },
  ];
  

const metals= [
    { label: 'Select Metal', value: '' },
    { label: '18K Gold', value: '18K Gold' },
    { label: '22K Gold', value: '22K Gold' },
    { label: '925 Silver', value: '925 Silver' },
    { label: 'Basic Silver', value: 'Basic Silver' },
    { label: 'Imitate Jewelry', value: 'Imitate Jewelry' },


];



const genders = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
];


const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        colors: [],
        price: '',
        oldPrice: '',
        description: '',
        isTrending: false,
        size: '',
        gender: '',
        metal: '' 
    });
    const [mainImage, setMainImage] = useState('');
    const [additionalImages, setAdditionalImages] = useState([]);

    const [addProduct, { isLoading, error }] = useAddProductMutation();
    const navigate = useNavigate();

 
    const handleColorsChange = (selectedOptions) => {
        setProduct({
          ...product,
          colors: selectedOptions.map((option) => ({
            value: option.value,
            code: option.code,
          })),
        });
      };
      

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const newProduct = {
          ...product,
          image: mainImage,
          additionalImages,
          author: user?._id, // Ensure author is included
        };
      
        console.log("Submitting Product Data:", newProduct); // Debug payload
      
        try {
          const response = await addProduct(newProduct).unwrap();
          alert("Product added successfully!");
          navigate("/shop");
        } catch (err) {
          console.error("Failed to add product:", err); // Log error details
        }
      };
      
      
    
    

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
    <div>
  <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
    Colors
  </label>
  <Select
    isMulti
    options={colorOptions}
    value={product.colors.map((color) =>
      colorOptions.find((option) => option.value === color.value)
    )}
    onChange={handleColorsChange}
    className="basic-multi-select"
    classNamePrefix="select"
  />
</div>



<SelectInput
                    label="Metal"  // Update label for clarity
                    name="metal"
                    value={product.metal}  // Updated to reflect state change
                    onChange={handleChange}  // Event handler remains
                    options={metals}  // Ensure metals options are passed
                />

<SelectInput
    label="Gender"
    name="gender"
    value={product.gender}
    onChange={handleChange}
    options={genders}
/>



<label htmlFor="size">Size </label>
        <input
          type="text"
          id="size"
          name="size"
          value={product.size}
          onChange={handleChange}
          placeholder="E.g., 'Small, Medium, Large' or 'Custom Size Description'"
          className="add-product-InputCSS"
        />

                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />
                 <TextInput
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="100"
                    value={product.oldPrice}
                    onChange={handleChange}
                />
                

                {/* Main Image Upload */}
                <UploadImage
                    name="mainImage"
                    setImage={(url) => setMainImage(url)}
                />

                {/* Additional Images Upload */}
                <UploadImage
                    name="additionalImages"
                    setImage={(urls) => setAdditionalImages(urls)}
                    multiple // Allow multiple image selection
                />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        name="description"
                        id="description"
                        value={product.description}
                        placeholder="Write a product description"
                        onChange={handleChange}
                        className="add-product-InputCSS"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isTrending"
                        id="isTrending"
                        checked={product.isTrending}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="isTrending" className="text-sm font-medium text-gray-700">
                        Mark as Trending Product
                    </label>
                </div>

                <div>
                    <button
                        type="submit"
                        className="add-product-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mt-4">Error adding product: {error.message}</p>}
        </div>
    );
};

export default AddProduct;