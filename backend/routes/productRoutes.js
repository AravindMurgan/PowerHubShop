import express from "express";
// import products from "../data/products.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route('/').get(getProducts).post(protect,admin, createProduct);

router.route('/top').get(getTopProducts);

router.route('/:id').get(checkObjectId,getProductById)
.put(protect,admin,checkObjectId,updateProduct)
.delete(protect,admin,checkObjectId,deleteProduct);   

router.route('/products').get(createProduct)

router.route('/:id/reviews').post(protect,createProductReview);


export default router;
