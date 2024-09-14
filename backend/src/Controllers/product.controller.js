import Product from "../Models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
    rating,
    numReviews,
    soldBy,
  } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      countInStock,
      rating,
      numReviews,
      soldBy,
    });
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
    rating,
    numReviews,
    soldBy,
  } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
      image,
      category,
      countInStock,
      rating,
      numReviews,
      soldBy,
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductsByRating = async (req, res) => {
  const { rating } = req.params;
  try {
    const products = await Product.find({ rating });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductsByPrice = async (req, res) => {
  const { price } = req.params;
  try {
    const products = await Product.find({ price });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductsByCountInStock = async (req, res) => {
  const { countInStock } = req.params;
  try {
    const products = await Product.find({ countInStock });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
