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

        
      </div>
    );
};

export default Banner;
