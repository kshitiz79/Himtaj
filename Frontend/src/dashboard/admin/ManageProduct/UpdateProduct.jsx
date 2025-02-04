import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../AddProduct/TextInput";
import SelectInput from "../AddProduct/SelectInput";
import UploadImage from "../AddProduct/UploadImage";
import { useFetchProductByIdQuery, useUpdateProductMutation } from "../../../../src/redux/features/products/productsApi";
import Select from "react-select";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Earrings", value: "Earrings" },
  { label: "Necklaces", value: "Necklaces" },
  { label: "Bracelets", value: "Bracelets" },
  { label: "Rings", value: "Rings" },
];

const colorOptions = [
  { label: "Silver", value: "Silver", code: "#C4C4C4" },
  { label: "Rose Gold", value: "Rose Gold", code: "#DEA193" },
  { label: "Gold", value: "Gold", code: "#EOEAA3E" },
  { label: "Platinum", value: "Platinum", code: "#E5E4E2" },
];

const metals = [
  { label: "18K Gold", value: "18K Gold" },
  { label: "22K Gold", value: "22K Gold" },
  { label: "925 Silver", value: "925 Silver" },
  { label: "Basic Silver", value: "Basic Silver" },
  { label: "Imitate Jewelry", value: "Imitate Jewelry" },
];
const genders = [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    colors: [],
    price: "",
    oldPrice: "",
    description: "",
    isTrending: false,
    size: "",
    metal: "",
    gender: "",
    image: "",
    additionalImages: [],
  });

  const [newMainImage, setNewMainImage] = useState(null);
  const [newAdditionalImages, setNewAdditionalImages] = useState([]);

  const { data: productData, isLoading: isProductLoading, error: fetchError } = useFetchProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      const {
        name,
        category,
        colors,
        price,
        oldPrice,
        description,
        isTrending,
        size,
        metal,
        gender,
        image,
        additionalImages,
      } = productData.product;

      setProduct({
        name: name || "",
        category: category || "",
        colors: colors || [],
        price: price || "",
        oldPrice: oldPrice || "",
        description: description || "",
        isTrending: isTrending || false,
        size: size || "",
        metal: metal || "",
        gender: gender || "",
        image: image || "",
        additionalImages: additionalImages || [],
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleColorsChange = (selectedOptions) => {
    setProduct({
      ...product,
      colors: selectedOptions.map((option) => ({
        value: option.value,
        code: option.code,
      })),
    });
  };

  const handleMainImageChange = (image) => {
    setNewMainImage(image);
  };

  const handleAdditionalImagesChange = (images) => {
    setNewAdditionalImages(images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newMainImage || product.image,
      additionalImages: newAdditionalImages.length > 0 ? newAdditionalImages : product.additionalImages,
      author: user?._id,
    };

    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      alert("Product updated successfully!");
      navigate("/dashboard/manage-products");
    } catch (err) {
      console.error("Failed to update product:", err);
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
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors</label>
          <Select
            isMulti
            options={colorOptions}
            value={colorOptions.filter((option) => product.colors.includes(option.value))}
            onChange={handleColorsChange}
          />
        </div>
        <SelectInput
          label="Metal"
          name="metal"
          value={product.metal}
          onChange={handleChange}
          options={metals}
        />
        <SelectInput label="Gender" name="gender" value={product.gender} onChange={handleChange} options={genders} />
        <TextInput
          label="Size"
          name="size"
          value={product.size}
          onChange={handleChange}
          placeholder="E.g., 'Small, Medium, Large'"
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
        />
        <TextInput
          label="Old Price"
          name="oldPrice"
          type="number"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Main Image</label>
          {product.image && <img src={product.image} alt="Main" className="w-40 h-40 object-cover rounded mb-4" />}
          <UploadImage name="mainImage" setImage={handleMainImageChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Images</label>
          <div className="flex gap-2 mb-4">
            {product.additionalImages.map((img, index) => (
              <img key={index} src={img} alt={`Additional ${index}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
          <UploadImage name="additionalImages" setImage={handleAdditionalImagesChange} multiple />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={6}
            name="description"
            value={product.description}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isTrending"
            checked={product.isTrending}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isTrending" className="text-sm font-medium text-gray-700">Mark as Trending Product</label>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
      {updateError && <p className="text-red-500 mt-4">Error updating product: {updateError.message}</p>}
    </div>
  );
};

export default UpdateProduct;
