
const express = require("express"); // Importing the express framework for creating the API
const Products = require("./products.model"); // Importing the Products model from products.model.js
const Reviews = require("../reviews/reviews.model"); // Importing the Reviews model from reviews.model.js
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router(); // Creating a new router object to handle routes

// post a product
router.post("/create-product", async (req, res) => { // Define a route for creating a new product
  try {
    const { name } = req.body; // Destructuring the 'name' from the request body (may be unused later)

    // Create a new product instance
    const newProduct = new Products({
      ...req.body, // Create a product using all fields from the request body
    });

    const savedProduct = await newProduct.save(); // Save the new product to the database

    // Calculate the average rating
    const reviews = await Reviews.find({ productId: savedProduct._id }); // Find all reviews for the newly saved product
    if (reviews.length > 0) { // If there are reviews
      const totalRating = reviews.reduce( // Calculate the total rating by summing up all review ratings
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length; // Calculate the average rating
      savedProduct.rating = averageRating; // Assign the average rating to the product's rating
      await savedProduct.save(); // Save the updated product with the new rating
    }

    res.status(201).json(savedProduct); // Return a success response with the newly created product
  } catch (error) {
    console.error("Error creating product:", error); // Log the error in case of failure
    res.status(500).json({ message: "Failed to create product" }); // Return a failure response
  }
});





// Get all posts (public route)
router.get("/", async (req, res) => { // Define a route to get all products
  try {
    const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query; // Extract filter and pagination options from query parameters

    const filter = {}; // Initialize an empty filter object

    if (category && category !== "all") { // If a category is specified, add it to the filter
      filter.category = category;
    }

    if (color && color !== "all") { // If a color is specified, add it to the filter
      filter.color = color;
    }

    if (minPrice && maxPrice) { // If both minimum and maximum price are specified, add them to the filter
      const min = parseFloat(minPrice); // Convert minPrice to a number
      const max = parseFloat(maxPrice); // Convert maxPrice to a number
      if (!isNaN(min) && !isNaN(max)) { // Ensure the prices are valid numbers
        filter.price = { $gte: min, $lte: max }; // Set the price filter for the query
      }
    }




    const skip = (parseInt(page) - 1) * parseInt(limit); // Calculate how many products to skip for pagination
    const totalProducts = await Products.countDocuments(filter); // Get the total number of products that match the filter
    const totalPages = Math.ceil(totalProducts / parseInt(limit)); // Calculate the total number of pages

    const products = await Products.find(filter) // Find products matching the filter
      .skip(skip) // Skip the appropriate number of products for pagination
      .limit(parseInt(limit)) // Limit the number of products returned
      .populate("author", "email") // Populate the 'author' field with the author's email
      .sort({ createdAt: -1 }); // Sort the products by creation date, most recent first

    res.status(200).send({ products, totalPages, totalProducts }); // Return the products, total pages, and total product count
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error in case of failure
    res.status(500).send({ message: "Failed to fetch products" }); // Return a failure response
  }
});

// Get single post (public route)
router.get("/:id", async (req, res) => { // Define a route to get a single product by its ID
  try {
    const productId = req.params.id; // Extract the product ID from the URL parameters

    const product = await Products.findById(productId).populate( // Find the product by ID and populate the 'author' field
      "author",
      "email username" // Populate the 'email' and 'username' of the author
    );

    if (!product) { // If no product is found, return a 404 error
      return res.status(404).send({ message: "Product not found" });
    }

    const reviews = await Reviews.find({ productId }).populate( // Find all reviews for the product and populate the 'userId' field
      "userId",
      "username email" // Populate the 'username' and 'email' of the user who wrote the review
    );

    res.status(200).send({ product, reviews }); // Return the product and its associated reviews
  } catch (error) {
    console.error("Error fetching post:", error); // Log the error in case of failure
    res.status(500).send({ message: "Failed to fetch post" }); // Return a failure response
  }
});

// update a post (protected route)
router.patch("/update-product/:id",verifyToken,verifyAdmin ,async (req, res) => { // Define a route to update a product by its ID
  try {
    const productId = req.params.id; // Extract the product ID from the URL parameters

    const updatedProduct = await Products.findByIdAndUpdate( // Find the product by ID and update it with the new data
      productId,
      { ...req.body }, // Spread the new product data from the request body
      { new: true } // Return the updated product after the update
    );

    if (!updatedProduct) { // If no product is found, return a 404 error
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ // Return a success message and the updated product
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error fetching product:", error); // Log the error in case of failure
    res.status(500).send({ message: "Failed to fetch product" }); // Return a failure response
  }
});

// delete a post with the related comment
router.delete("/:id", async (req, res) => { // Define a route to delete a product by its ID
  try {
    const productId = req.params.id; // Extract the product ID from the URL parameters

    const deletedProduct = await Products.findByIdAndDelete(productId); // Find and delete the product by ID

    if (!deletedProduct) { // If no product is found, return a 404 error
      return res.status(404).send({ message: "Post not found" });
    }

    await Reviews.deleteMany({ productId: productId }); // Delete all reviews associated with the deleted product

    res.status(200).send({ // Return a success message indicating the product and reviews were deleted
      message: "Product and associated comments deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error); // Log the error in case of failure
    res.status(500).send({ message: "Failed to delete post" }); // Return a failure response
  }
});

// related products
router.get("/related/:id", async (req, res) => { // Define a route to get related products
  try {
    const { id } = req.params; // Extract the product ID from the URL parameters

    if (!id) { // If no ID is provided, return a 400 error
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await Products.findById(id); // Find the product by ID

    if (!product) { // If no product is found, return a 404 error
      return res.status(404).send({ message: "Product not found" });
    }

    const titleRegex = new RegExp( // Create a regex pattern for partial matching of the product name
      product.name
        .split(" ") // Split the product name into individual words
        .filter((word) => word.length > 1) // Filter out short words
        .join("|"), // Join the words into a regex pattern
      "i" // Case-insensitive matching
    );

    const relatedProducts = await Products.find({ // Find related products by matching name or category
      _id: { $ne: id }, // Exclude the current product
      $or: [
        { name: { $regex: titleRegex } }, // Match products with similar names
        { category: product.category }, // Match products in the same category
      ],
    });

    res.status(200).send(relatedProducts); // Return the related products
  } catch (error) {
    console.error("Error fetching related products:", error); // Log the error in case of failure
    res.status(500).send({ message: "Failed to fetch related products" }); // Return a failure response
  }
});

module.exports = router; // Export the router so it can be used in the main application
