import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
<div className='banner__card'>
    <span> <i className="ri-vip-diamond-line"></i></span>
<h4>Premium Products</h4>
<p>Top-notch quality for all your needs.</p>
</div>
<div className='banner__card'>
    <span> <i className="ri-truck-fill"></i></span>
<h4>Free Delivery</h4>
<p>Fast and free delivery, always on time!</p>
</div>
<div className='banner__card'>
    <span> <i className="ri-money-rupee-circle-fill"></i></span>
<h4>Best Value</h4>
<p>Unbeatable deals that fit your budget.</p>
</div>
    </section>
  )
}

export default PromoBanner