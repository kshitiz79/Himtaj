import { Link } from 'react-router-dom';
import videoSrc from "./../../assets/HIMTAJ.mp4"; // Import your video file here



const Banner = () => {
    return (
      <div className="section__container header2__container relative overflow-hidden">
        {/* Video Background */}
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="header__content  relative">
          <h5  className="uppercase font-medium mb-3 text-slate-50">UP to 20% Discount</h5>
          <h6 className='font-bold text-gray-50 text-7xl'>Himtaj Jewelers</h6>
          <p className='mt-4'>Lorem ipsum, dolor sit amet epudiandae rem excepturi, reiciendis dolorum iure.</p>
          <button className="btn">
            <Link to="/shop">EXPLORE NOW</Link>
          </button>
        </div>
      </div>
    );
};

export default Banner;
