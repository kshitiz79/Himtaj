
import { Blogs } from "../blogs/Blogs";
import Trending from "../shop/Trending";
import Banner from "./Banner";
import Categories from "./Categories";
import DealsSection from "./DealsSection";
import Hero from "./Hero";

import PromoBanner from "./PromoBanner";



const Home = () => {
  return (
    <>

    <Banner/>
    <Categories/>
    <Hero/>
    <Trending/>
 <DealsSection/>
    <PromoBanner/>
  
    <Blogs/>


    </>
  )
}

export default Home;