import React, { useContext, useState, useEffect } from 'react';
import './BestSeller.css';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Title = ({ text1, text2 }) => (
    <div className="title-container">
        <h2>{text1} {text2}</h2>
        <p className="subtitle">Discover our most popular items that customers love.
        </p>
    </div>
);

const ProductItem = ({ id, image, name, price }) => (
    <div className="product-item">
        <Link to={`/product/${id}`} className="product-image">
            <img src={Array.isArray(image) ? image[0] : image} alt={name} />
        </Link>
        <div className="product-details">
            <h3 className="product-name">{name}</h3>
            <p className="product-price">${price}</p>
        </div>
    </div>
);

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestsellerProducts, setBestsellerProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const bestsellers = products.filter(product => product.bestseller);
            setBestsellerProducts(bestsellers);
        }
    }, [products]);

    return (
        <div className="bestseller-container" id="bestseller-section">
            <div className="bestseller-header">
                <Title text1="BEST" text2="SELLERS" />
            </div>
            
            <div className="products-container">
                {bestsellerProducts.map((item, index) => (
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

export default BestSeller;
