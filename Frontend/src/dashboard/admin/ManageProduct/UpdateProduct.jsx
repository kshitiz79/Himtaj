import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import TextInput from './../AddProduct/TextInput';
import SelectInput from './../AddProduct/SelectInput'; // Correct import for SelectInput
import UploadImage from './../AddProduct/UploadImage';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../src/redux/features/products/productsApi';

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


const UpdateProduct = () => {
    const { id } = useParams();

    const navigate = useNavigate(); // For navigation
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
        image: '' // This will store the URL or the image file
    });
    const [newImage, setNewImage] = useState(null); // For storing the new image

    const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id); // Add refetch
    const { name, category, color, description, image: imageURL, price } = productData?.product || {};

    const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();

    useEffect(() => {
        if (productData) {
            console.log("Fetched product data:", productData); // Log the fetched data
            setProduct({
                name: name || '',
                category: category || '',
                color: color || '',
                price: price || '',
                description: description || '',
                image: imageURL || ''
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImageChange = (image) => {
        setNewImage(image); // Store new image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting update with data:", product); // Log the data being submitted
    
        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image, 
            author: user?._id
        };
    
        try {
            await updateProduct({ id: id, ...updatedProduct }).unwrap(); // Ensure unwrap is being called
            alert('Product updated successfully!');
            await refetch();
            navigate("/dashboard/manage-products");
    
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    if (isProductLoading) return <p>Loading product...</p>;
    if (fetchError) return <p className="text-red-500">Error fetching product: {fetchError.message}</p>;

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* product name */}
                <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />

                {/* category */}
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />

                {/* color */}
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />

                {/* price */}
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />

                {/* image upload */}
                <UploadImage
                    name="image"
                    id="image"
                    value={newImage || product.image} 
                    setImage={handleImageChange} 
                    placeholder='Upload a product image'
                />

                {/* description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        name="description"
                        id="description"
                        value={product.description}
                        placeholder='Write a product description'
                        onChange={handleChange}
                        className="add-product-InputCSS"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="add-product-btn"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </form>

            {updateError && <p className="text-red-500 mt-4">Error updating product: {updateError.message}</p>}
        </div>
    );
};

export default UpdateProduct;
