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
    { name: 'Category 1', path: 'namea', image: category1 },
    { name: 'Category 2', path: 'nameb', image: category2 },
    { name: 'Category 3', path: 'namec', image: category3 },
    { name: 'Category 4', path: 'named', image: category4 },
    { name: 'Category 5', path: 'namee', image: category5 },
    { name: 'Category 6', path: 'namef', image: category6 },
    { name: 'Category 7', path: 'nameg', image: category7 },
    { name: 'Category 8', path: 'nameh', image: category8 },
    { name: 'Category 9', path: 'namei', image: category9 },
    { name: 'Category 10', path: 'namej', image: category10 },
    { name: 'Category 11', path: 'namek', image: category11 },
    { name: 'Category 12', path: 'namel', image: category12 },
  ];
  

  return (
<div className='categories__grid '>

      {categories.map((category) => (
        <Link key={category.name}
          to={`/categories/${category.path}`}
          
          className='categories__card'
        >
          <img
            src={category.image}
            alt={category.name}
          
          />
          <h4>
            {category.name}
          </h4>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
