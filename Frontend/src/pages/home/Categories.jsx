import { Link } from 'react-router-dom'; // Make sure Link is imported
import category1 from "../../assets/category3.png";
import category2 from "../../assets/category1.png";
import category3 from "../../assets/category5.png";
import category4 from "../../assets/category6.png";
import category5 from "../../assets/category12.png";
import category6 from "../../assets/category10.png";
import category7 from "../../assets/category11.png";
import category8 from "../../assets/category8.png";
import category9 from "../../assets/category2.png";
import category10 from "../../assets/category7.png";
import category11 from "../../assets/category4.png";
import category12 from "../../assets/category9.png";

const Categories = () => {
  const categories = [

    { name: 'Earrings', path: 'Earrings', image: category2 },
    { name: 'Necklaces', path: 'Necklaces', image: category9 },
    { name: 'Studs', path: 'Studs', image: category1 },
    { name: 'Bracelets', path: 'Bracelets', image: category11 },
    { name: 'Rings', path: 'Rings', image: category3 },
    { name: 'Anklets', path: 'Anklets', image: category4 },
    { name: 'Idols & Coins', path: 'Idols & Coins', image: category10 },
    { name: "Men's Jewellery", path: 'Men\'s Jewellery', image: category8 },

    { name: "Kid\'s Jewellery", path: 'Kis\'s Jewellery', image: category12 },

    { name: 'Bridal Jewellery', path: 'Bridal Jewellery', image: category6 },
    { name: 'Fashion Jewellery ', path: 'Fashion Jewellery', image: category7 },
    { name: 'Gold Jewellery', path: 'Gold Jewellery', image:category5 },
];


  return (
    <div className="categories__grid">
    {categories.map((category, index) => (
      <Link 
        key={index}     
        to={`/shop/category/${category.path}`} 
        className="categories__card"
      > 
        <img src={category.image} alt={category.name} />
        <h4>{category.name}</h4>
      </Link>
    ))}
  </div>
  );
};

export default Categories;




 {/* Iterate over the categories array to create individual category cards */}