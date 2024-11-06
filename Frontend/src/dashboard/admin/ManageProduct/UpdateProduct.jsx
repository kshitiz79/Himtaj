import React, { useState, useEffect } from 'react';
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

const metals = [
    { label: 'Select Metal', value: '' },
    { label: '18K Gold', value: '18K Gold' },
    { label: '22K Gold', value: '22K Gold' },
    { label: '925 Silver', value: '925 Silver' },
    { label: 'Basic Silver', value: 'Basic Silver' },
    { label: 'Imitate Jewelry', value: 'Imitate Jewelry' },
];

const sizes = Array.from({ length: 21 }, (_, i) => i + 5).map(size => ({
    label: size.toString(),
    value: size.toString()
}));

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        oldPrice: '',
        description: '',
        isTrending: false,
        size: '',
        metal: '',
        image: '', // Main image URL or file
        additionalImages: [] // Array for additional images
    });

    const [newImage, setNewImage] = useState(null); // For storing new main image
    const [newAdditionalImages, setNewAdditionalImages] = useState([]); // For new additional images

    const { data: productData, isLoading: isProductLoading, error: fetchError } = useFetchProductByIdQuery(id);
    const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();

    useEffect(() => {
        if (productData) {
            const { name, category, color, price, oldPrice, description, isTrending, size, metal, image, additionalImages } = productData.product;
            setProduct({
                name: name || '',
                category: category || '',
                color: color || '',
                price: price || '',
                oldPrice: oldPrice || '',
                description: description || '',
                isTrending: isTrending || false,
                size: size || '',
                metal: metal || '',
                image: image || '',
                additionalImages: additionalImages || []
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (image) => {
        setNewImage(image);
    };

    const handleAdditionalImagesChange = (images) => {
        setNewAdditionalImages(images);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image,
            additionalImages: newAdditionalImages.length > 0 ? newAdditionalImages : product.additionalImages,
            author: user?._id
        };

        try {
            await updateProduct({ id, ...updatedProduct }).unwrap();
            alert('Product updated successfully!');
            navigate('/dashboard/manage-products');
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
                    label="Metal"
                    name="metal"
                    value={product.metal}
                    onChange={handleChange}
                    options={metals}
                />
                <SelectInput
                    label="Size"
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
                <TextInput
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="100"
                    value={product.oldPrice}
                    onChange={handleChange}
                />
                <UploadImage
                    name="mainImage"
                    setImage={handleImageChange}
                />
                <UploadImage
                    name="additionalImages"
                    setImage={handleAdditionalImagesChange}
                    multiple
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
