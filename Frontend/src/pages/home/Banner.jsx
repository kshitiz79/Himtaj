
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

import bannerImg1 from "../../assets/images-1.jpg"
import bannerImg2 from "../../assets/images-2.jpg"
import bannerImg3 from "../../assets/images-3.jpg"
import bannerImg4 from "../../assets/images-4.jpg"

const Banner = () => {
    // Array of images
    const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];
    
    // State to track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    // Effect to change the image every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <div className='section__container header__container'>
        <div className='header__content z-30'>
          <h4 className='uppercase'>UP to 20% Discount</h4>
          <h1>Himtaj Jewelers</h1>
          <p>Lorem ipsum, dolor sit amet epudiandae rem excepturi, reiciendis dolorum iure.</p>
          <button className='btn'>
            <Link to='/shop'>EXPLORE NOW</Link>
          </button>
        </div>
        <div className='header__image'>
          {/* Display the current image based on the index */}
          <img src={images[currentImageIndex]} alt='banner' />
        </div>
      </div>
    );
  };
  
  export default Banner;