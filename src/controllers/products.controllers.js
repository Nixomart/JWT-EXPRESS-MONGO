import Product from "../models/Product.js";

export const createProducts = async(req, res) => {
  const {name, category, price, imgURL} = req.body
  const newProduct = new Product({name, category, price, imgURL})
  const productSaved = await newProduct.save()
  res.status(201).json(productSaved);
};
export const getProducts = (req, res) => {
  res.json("products");
};
export const deleteProduct = (req, res) => {};
export const addProduct = (req, res) => {};
export const updateProduct = (req, res) => {};
export const getProductById = (req, res) => {};
