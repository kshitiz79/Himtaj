import { Link } from "react-router-dom";
import category1 from "../../assets/category3.png";
import category2 from "../../assets/category1.png";
import category3 from "../../assets/category5.png";
import category4 from "../../assets/Anklets.webp";
import category5 from "../../assets/GOLD.png";
import category6 from "../../assets/category10.png";
import category7 from "../../assets/category11.png";
import category8 from "../../assets/category8.png";
import category9 from "../../assets/category2.png";
import category10 from "../../assets/FJ.webp";
import category11 from "../../assets/category4.png";
import category12 from "../../assets/category9.png";

const Categories = () => {
  const categories = [
    { name: "Earrings", path: "Earrings", image: category2 },
    { name: "Necklaces", path: "Necklaces", image: category9 },
    { name: "Studs", path: "Studs", image: category1 },
    { name: "Bracelets", path: "Bracelets", image: category11 },
    { name: "Rings", path: "Rings", image: category3 },
    { name: "Anklets", path: "Anklets", image: category4 },
    { name: "Idols & Coins", path: "Idols & Coins", image: category10 },
    { name: "Men's Jewellery", path: "Men's Jewellery", image: category8 },
    { name: "Kid's Jewellery", path: "Kid's Jewellery", image: category12 },
    { name: "Bridal Jewellery", path: "Bridal Jewellery", image: category6 },
    { name: "Fashion Jewellery", path: "Fashion Jewellery", image: category7 },
    { name: "Gold Jewellery", path: "Gold Jewellery", image: category5 },
  ];

  return (
    <div className="mx-auto mt-16 max-w-[1200px]">
      {/* Desktop View */}
      <div className="hidden grid-cols-6 gap-8 md:grid">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/shop/category/${category.path}`}
            className="text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="mx-auto mb-4 max-w-[100px] rounded-lg border-4 border-primary-light shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-xl"
            />
            <h4 className="font-header text-lg font-semibold text-dark">
              {category.name}
            </h4>
          </Link>
        ))}
      </div>

      {/* Mobile View - Two Horizontal Rows */}
      <div className="overflow-x-auto space-y-4 md:hidden scrollbar-hide  px-5">
        <div className="flex space-x-6 ">
          {categories.slice(0, 6).map((category, index) => (
           <Link
           key={index}
           to={`/shop/category/${category.path}`}
           className="flex-shrink-0 text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg w-[100px]" // Ensures all cards have the same width
         >
           <img
             src={category.image}
             alt={category.name}
             className="mx-auto mb-2 w-full rounded-lg border-2 border-primary-light"
           />
           <h4 className="text-xs font-semibold w-full text-center truncate">
             {category.name}
           </h4>
         </Link>
         
          ))}
        </div>
        <div className="flex space-x-6 ">
          {categories.slice(6).map((category, index) => (
           <Link
           key={index}
           to={`/shop/category/${category.path}`}
           className="flex-shrink-0 text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg w-[100px]" // Ensures all cards have the same width
         >
           <img
             src={category.image}
             alt={category.name}
             className="mx-auto mb-2 w-full rounded-lg border-2 border-primary-light"
           />
           <h4 className="text-xs font-semibold w-full text-center truncate">
             {category.name}
           </h4>
         </Link>
         
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
