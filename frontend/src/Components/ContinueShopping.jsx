import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function getRandomItems(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const ContinueShopping = ({ currentId }) => {
  const { products } = useContext(ShopContext);

  if (!products || products.length === 0) return null;

  // Exclude the current product
  const filtered = products.filter(item => item._id !== currentId);

  // Pick 5 random products
  const randomProducts = getRandomItems(filtered, 5);

  return (
    <div style={{ margin: "3rem 0", textAlign: "center" }}>
      {/* Title and Button Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "0 auto 2rem auto",
        padding: "0 1rem"
      }}>
        <h2 style={{ fontSize: "2rem", margin: 0, textAlign: "left" }}>Suggestions</h2>
        <Link
          to="/collection"
          style={{
            background: "#222",
            color: "#fff",
            padding: "0.7rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "background 0.2s"
          }}
        >
          Continue Shopping
        </Link>
      </div>
      {/* Product Suggestions */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap"
      }}>
        {randomProducts.map((item) => (
          <div key={item._id} style={{ width: "200px" }}>
            <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  marginBottom: "0.75rem"
                }}
              />
              <div style={{ fontWeight: 500, fontSize: "1rem", marginBottom: "0.25rem", textAlign: "center" }}>
                {item.name}
              </div>
              <div style={{ color: "#444", fontWeight: 600, fontSize: "1.1rem", textAlign: "center" }}>
                ${item.price}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueShopping;