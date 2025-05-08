import React from 'react'
import { assets } from '../assets/assets'
import './OurPolicy.css'

const OurPolicy = () => {
  return (
    <div className='policy-container'>
      <div className='policy-content'>
        <div className='policy-items'>
          <div className='policy-item'>
            <img src={assets.exchange_icon} className='policy-icon' alt="Exchange Policy" />
            <h3 className='policy-title'>Easy Exchange Policy</h3>
            <p className='policy-description'>We offer hassle free exchange policy</p>
          </div>
          <div className='policy-item'>
            <img src={assets.quality_icon} className='policy-icon' alt="Return Policy" />
            <h3 className='policy-title'>7 Days Return Policy</h3>
            <p className='policy-description'>We Provide 7 Days Return Policy</p>
          </div>
          <div className='policy-item'>
            <img src={assets.support_img} className='policy-icon' alt="Customer Support" />
            <h3 className='policy-title'>Best Customer Support</h3>
            <p className='policy-description'>We provide best customer support 24/7</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
