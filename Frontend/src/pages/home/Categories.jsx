import { Link } from 'react-router-dom'; // Make sure Link is imported
import category1 from "../../assets/cat.webp";
import category2 from "../../assets/cat.webp";
import category3 from "../../assets/cat.webp";
import category4 from "../../assets/cat.webp";
import category5 from "../../assets/cat.webp";
import category6 from "../../assets/cat.webp";
import category7 from "../../assets/cat.webp";
import category8 from "../../assets/cat.webp";
import category9 from "../../assets/cat.webp";
import category10 from "../../assets/cat.webp";
import category11 from "../../assets/cat.webp";
import category12 from "../../assets/cat.webp";

const Categories = () => {
  const categories = [
    { name: 'Bracelets', path: 'bracelets', image: category1 },
    { name: 'Rings', path: 'rings', image: category2 },
    { name: 'Earrings', path: 'earrings', image: category3 },
    { name: 'Necklaces', path: 'necklaces', image: category4 },
    { name: 'Pendants', path: 'pendants', image: category5 },
    { name: 'Nose Pins', path: 'nose-pins', image: category6 },
    { name: 'Anklets', path: 'anklets', image: category7 },
    { name: 'Bangles', path: 'bangles', image: category8 },
    { name: 'Idols & Coins', path: 'idols-coins', image: category9 },
    { name: 'Mens Jewelry', path: 'mens-jewelry', image: category10 },
    { name: 'Kids Jewelry', path: 'kids-jewelry', image: category11 },
    { name: 'Others Jewelry', path: 'others-jewelry', image: category12 },
  ];
  

  return (
<div className='categories__grid '>





{categories.map((category, index) => (
  <Link key={index}     
  to={`/categories/${category.path}`} className='categories__card'> 
    <img src={category.image} alt={category.name} />
    <h4>{category.name}</h4>
  </Link>
))}

    </div>
  );
};

export default Categories;




 {/* Iterate over the categories array to create individual category cards */}