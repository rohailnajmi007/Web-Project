import React, { useContext, useState, useEffect } from 'react';
import './LatestCollection.css';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Title = ({ text1, text2 }) => (
    <div className="title-container">
        <h2>{text1} {text2}</h2>
        <p className="subtitle">All of the niggas fighting the 100 men vs 1 Gorilla will be wearing
            our shirts. 
        </p>
    </div>
);

const ProductItem = ({ id, image, name, price }) => {
    let imgSrc = 'https://via.placeholder.com/300';
    if (Array.isArray(image) && typeof image[0] === 'string' && image[0]) {
        imgSrc = image[0];
    } else if (typeof image === 'string' && image) {
        imgSrc = image;
    }
    console.log('DEBUG ProductItem:', name, 'image array:', image, 'imgSrc:', imgSrc);
    return (
        <div className="product-item">
            <Link to={`/product/${id}`} className="product-image">
                <img 
                    src={imgSrc}
                    alt={name}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300'; }}
                />
            </Link>
            <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <p className="product-price">${price}</p>
            </div>
        </div>
    );
};

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Ensure we have products before setting them
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10)); // Show first 10 products (2 rows of 5)
        }
    }, [products]);

    return (
        <div className="latest-collection-container">
            <div className="latest-collection-header">
                <Title text1="LATEST" text2="COLLECTIONS" />
            </div>
            
            <div className="products-container">
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;