import React, { useState } from 'react'
import {useParams} from 'react-router-dom'

const CategoryPage = () => {
    const {categoryName} = useParams();
    const [filteredProducts, setfilteredProducts] = useState([]);
    

  return (
    <section >

    </section>
  )
}

export default CategoryPage