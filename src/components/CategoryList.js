import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function CategoryList() {
  const [items, setItems] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/${category}`);
      setItems(response.data.results);
    };

    fetchData();
  }, [category]);

  return (
    <div>
        <h2 className='title category'>Category: {category}</h2>
      {items.map((item) => (
        <Link key={item.index} to={`/${category}/${item.index}`}>{item.name}<br /></Link> 
      ))}
      <Link to={`/`}><h4>Go Back to categories list</h4></Link> 
    </div>
  );
}

export default CategoryList;
