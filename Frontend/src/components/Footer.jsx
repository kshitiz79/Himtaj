import React from 'react'
import instaImg from "../../src/assets/instagram-1.jpg"
import instaImg2 from "../../src/assets/instagram-2.jpg"
import instaImg3 from "../../src/assets/instagram-3.jpg"
import instaImg4 from "../../src/assets/instagram-4.jpg"
import instaImg5 from "../../src/assets/instagram-5.jpg"
import instaImg6 from "../../src/assets/instagram-6.jpg"

const Footer = () => {
  return (
  
    <>
<footer className='section__container footer__container'>
    <div className='footer__col'>
        <h4> Contact Info</h4>
        <p>
            <span>
            <i className="ri-map-pin-fill"></i>  </span>
            T3-236 , Golden-I , Techzone IV , Greater Noida West , Uttar Pradesh , 201306        
            </p>
            <p>
                <span>
                <i className="ri-mail-line"></i>  </span>
                himtajjewellery@gmail.com
              
            </p>
            <p>
                <span>
                <i className="ri-phone-fill"></i> </span>
                91+123456
               
            </p>
          
  
    </div>
    <div className='footer__col'>
                <h4>
                    COMPONY
                </h4>
                <a href="/">Home</a>
                <a href="/">About US</a>
                <a href="/">Work With Us</a>
                <a href="/">Our Blogs</a>
                <a href="/">Terms & Condition</a>

            </div>
            <div className='footer__col'>
                <h4>
                UseFUl Links
                </h4>
                <a href="/">Home</a>
                <a href="/">About US</a>
                <a href="/">Work With Us</a>
                <a href="/">Our Blogs</a>
                <a href="/">Terms & Condition</a>

            </div>
            <div className='footer__col'>
                <h4>
                 INSTAGRAM
                </h4>
                <div className='instagram__grid'>
                    <img src={instaImg } alt=""/>
                    <img src={instaImg2 } alt=""/>
                    <img src={instaImg3 } alt=""/>
                    <img src={instaImg4 } alt=""/>
                    <img src={instaImg5 } alt=""/>
                    <img src={instaImg6 } alt=""/>

                </div>
               

            </div>

</footer>


    </>
  )
}

export default Footer