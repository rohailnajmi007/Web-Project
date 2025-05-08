import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import './Product.css';
import ContinueShopping from '../Components/ContinueShopping';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!products || products.length === 0) {
      navigate('/');
      return;
    }

    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image[0]);
    } else {
      navigate('/');
    }
  }, [productId, products, navigate]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(productData._id, selectedSize);
  };

  if (!productData) {
    return (
      <div className="product-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="product-grid">
        {/* Product Images */}
        <div className="product-images">
          <div className="thumbnail-container">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${productData.name} view ${index + 1}`}
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={selectedImage} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{productData.name}</h1>

          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <img key={index} src={assets.star_icon} alt="star" className="w-3.5" />
            ))}
            <span>(122)</span>
          </div>

          <div className="price">
            {currency}{productData.price}
          </div>

          <p className="description">{productData.description}</p>

          <div className="size-selector">
            <h3>Select Size</h3>
            <div className="size-options">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div className="product-features">
            <p className="feature-item">100% original products</p>
            <p className="feature-item">Cash on delivery available</p>
            <p className="feature-item">Easy Return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="product-description">
        <div className="description-tabs">
          <button
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (122)
          </button>
        </div>

        <div className="description-content">
          {activeTab === 'description' ? (
            <>
              <p>{productData.description}</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </>
          ) : (
            <div className="reviews">
              <p>No reviews yet</p>
            </div>
          )}
        </div>
      </div>
      <ContinueShopping currentId={productData._id} />
    </div>
  );
};

export default Product;
