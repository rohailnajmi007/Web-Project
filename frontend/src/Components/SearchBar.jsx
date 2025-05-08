import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import searchIcon from '../assets/search_icon.png';
import { assets } from '../assets/assets';
import './SearchBar.css';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

    return showSearch ? (
        <div className='searchbar-container'>
            <div className='searchbar-box'>
                <input 
                  type="text" 
                  placeholder='Search' 
                  className='searchbar-input' 
                  value={search} 
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <img className='searchbar-icon' src={searchIcon} alt="search" />
            </div>
            <img onClick={()=>setShowSearch(false)} className='searchbar-close' src={assets.cross_icon} alt="close"/>
        </div>
    ) : null;
};

export default SearchBar;