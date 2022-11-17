import Product from "../models/Product.js";

export const createProducts = async(req, res) => {
  const {name, category, price, imgURL} = req.body
  const newProduct = new Product({name, category, price, imgURL})
  const productSaved = await newProduct.save()
  res.status(201).json(productSaved);
};

export const getProducts = async(req, res) => {
  const products = await Product.find()
  res.json(products)
};
export const getProductById = async(req, res) => {
  const product = await Product.findById(req.params.productId)
  res.json(product)
};
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId)
  res.send('Producto eliminado ')
};

export const updateProduct = async(req, res) => { 
  const productUpdated = await Product.findByIdAndUpdate(req.params.productId, req.body, {new: true})
  res.json(productUpdated)
}
