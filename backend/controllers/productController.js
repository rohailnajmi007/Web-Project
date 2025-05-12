import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!req.files) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    const image1 = req.files.image1 && req.files.image1[0].path;
    const image2 = req.files.image2 && req.files.image2[0].path;
    const image3 = req.files.image3 && req.files.image3[0].path;
    const image4 = req.files.image4 && req.files.image4[0].path;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    if (images.length === 0) {
      return res.json({
        success: false,
        message: "At least one image is required",
      });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        // Fixed: use item directly as it's already the file path
        let result = await cloudinary.uploader.upload(item, {
          resource_type: "auto",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//single product info
const singleProduct = async (req, res) => {
  try {
    const { productID } = req.body;
    const product = await productModel.findById(productID);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
