import { Link } from 'react-router-dom';
import videoSrc from "./../../assets/HIMTAJ.mp4"; // Import your video file here



const Banner = () => {
    return (
      <div className="relative overflow-hidden lg:min-h-[650px] min-h-[270px] rounded-b-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center section__container">
      {/* Video Background */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        className="absolute inset-0 lg:w-full lg:h-full h-[22rem] object-cover -z-10"
      />


<div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent -z-0 "></div>
    </div>
    
    );
};

export default Banner;
