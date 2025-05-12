import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import './Collection.css';

// Title component for the right side
const Title = ({ text1, text2 }) => (
  <h2 style={{ fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.01em', fontFamily: 'Poppins, Arial, sans-serif', margin: 0 }}>
    {text1} <span style={{ fontWeight: 400 }}>{text2}</span> <span style={{ borderBottom: '3px solid #222', display: 'inline-block', width: '2rem', marginLeft: '0.5rem', verticalAlign: 'middle' }}></span>
  </h2>
);

const Collection = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [sortOption, setSortOption] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };



  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };



  useEffect(() => {
    let productsCopy = products.slice();
  
    // Search filter
    if (search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
  
    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(product => category.includes(product.category));
    }
  
    // Subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory));
    }
  
    // Sorting
    if (sortOption === 'low-high') {
      productsCopy = [...productsCopy].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      productsCopy = [...productsCopy].sort((a, b) => b.price - a.price);
    }
  
    setFilteredProducts(productsCopy);
  }, [products, category, subCategory, sortOption, search, showSearch]);

  return (
    <div className={`collection-flex${!showSearch ? ' no-search' : ''}`}>
      {isMobile ? (
        <>
          {/* Heading */}
          <div className="collection-header-row" style={{ justifyContent: 'center' }}>
            <div className="collection-title-col" style={{ width: '100%', textAlign: 'center', margin: '1.5rem 0 1rem 0' }}>
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
            </div>
          </div>
          {/* Sort Dropdown (full width) */}
          <div style={{ width: '100%', margin: '0 0 1rem 0', display: 'flex', justifyContent: 'flex-start' }}>
            <select
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                outline: 'none'
              }}
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value='relevant'>Sort by: Relevant</option>
              <option value='low-high'>Sort by: Low to High</option>
              <option value='high-low'>Sort by: High to Low</option>
            </select>
          </div>
          {/* Filters (full width) */}
          <div className='collection-filter-col' style={{ width: '100%', marginLeft: 0, marginBottom: '1rem' }}>
            {showFilter && (
              <>
                <div className='collection-filter-box'>
                  <p className='collection-filter-label'>Category</p>
                  <label className='collection-filter-checkbox'><input type="checkbox" value={'Men'} onChange={toggleCategory} /> Men</label>
                  <label className='collection-filter-checkbox'><input type="checkbox" value={'Women'} onChange={toggleCategory} /> Women</label>
                  <label className='collection-filter-checkbox'><input type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids</label>
                </div>
                <div className='collection-filter-box'>
                  <p className='collection-filter-label'>TYPE</p>
                  <div className='collection-filter-options'>
                    <label className='collection-filter-checkbox'>
                      <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                    </label>
                    <label className='collection-filter-checkbox'>
                      <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                    </label>
                    <label className='collection-filter-checkbox'>
                      <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Products Grid (2 columns) */}
          <div className="collection-products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id || product._id} className="product-item">
                <a href={`/product/${product.id || product._id}`} className="product-image">
                  <img 
                    src={Array.isArray(product.image) && typeof product.image[0] === 'string' && product.image[0] ? product.image[0] : 'https://via.placeholder.com/300'} 
                    alt={product.name} 
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300'; }}
                  />
                </a>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="collection-main-row">
          {/* Filters Column for desktop */}
          <div className='collection-filter-col' style={{ display: 'flex', flexDirection: 'column', minWidth: 220 }}>
            {showFilter && (
              <>
                <div className='collection-filter-box'>
                  <p className='collection-filter-label'>Category</p>
                  <label className='collection-filter-checkbox'><input type="checkbox" value={'Men'} onChange={toggleCategory} /> Men</label>
                  <label className='collection-filter-checkbox'><input type="checkbox" value={'Women'} onChange={toggleCategory} /> Women</label>
                  <label className='collection-filter-checkbox'><input type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids</label>
                </div>
                <div className='collection-filter-box'>
                  <p className='collection-filter-label'>TYPE</p>
                  <div className='collection-filter-options'>
                    <label className='collection-filter-checkbox'>
                      <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                    </label>
                    <label className='collection-filter-checkbox'>
                      <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                    </label>
                    <label className='collection-filter-checkbox'>
                      <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Products Column */}
          <div style={{ flex: 1, paddingLeft: '2rem' }}>
            <div className="collection-title-col" style={{ width: '100%', textAlign: 'center', margin: '1.5rem 0 1rem 0' }}>
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
            </div>
            {/* Sort Options */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <select 
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value='relevant'>Sort by: Relevant</option>
                <option value='low-high'>Sort by: Low to High</option>
                <option value='high-low'>Sort by: High to Low</option>
              </select>
            </div>
            {/* Products Grid */}
            <div className="collection-products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id || product._id} className="product-item">
                  <a href={`/product/${product.id || product._id}`} className="product-image">
                    <img 
                      src={Array.isArray(product.image) && typeof product.image[0] === 'string' && product.image[0] ? product.image[0] : 'https://via.placeholder.com/300'} 
                      alt={product.name} 
                      onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300'; }}
                    />
                  </a>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;