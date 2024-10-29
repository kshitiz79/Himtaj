import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../../../src/redux/features/products/productsApi';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useNavigate } from 'react-router-dom';

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
    { label: 'Gold Jewellery', value: 'Gold Jewellery' }
];

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Silver', value: 'Silver' },
    { label: 'Rose Gold', value: 'Rose Gold' },
    { label: 'Gold', value: 'Gold' }
];

const sizes = Array.from({ length: 11 }, (_, i) => i + 5).map(size => ({
    label: size.toString(),
    value: size.toString()
}));

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
        isTrending: false,
        size: '' // Optional field for size
    });
    const [image, setImage] = useState('');

    const [addProduct, { isLoading, error }] = useAddProductMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value // Handle checkbox value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!product.name || !product.category || !product.price || !product.color || !product.description) {
            alert('Please fill in all required fields.');
            return;
        }
        
        try {
            await addProduct({ ...product, image, author: user?._id }).unwrap();
            alert('Product added successfully!');
            setProduct({ name: '', category: '', color: '', price: '', description: '', isTrending: false, size: '' });
            setImage('');
            navigate("/shop");
        } catch (err) {
            console.error('Failed to add product:', err);
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
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />
                <SelectInput
                    label="Size" // Add Size Select Input
                    name="size"
                    value={product.size}
                    onChange={handleChange}
                    options={[{ label: 'Select Size', value: '' }, ...sizes]}
                />
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />
               
                <UploadImage
                    name="image"
                    id="image"
                    value={image}
                    setImage={setImage}
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
