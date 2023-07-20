import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

// This is your ItemDetail component. 
// Here we're using React's useEffect hook to fetch data from the API when the component mounts.

function ItemDetail() {
  const [item, setItem] = useState({});
  const { category, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/${category}/${id}`);
      setItem(response.data);
    };

    fetchData();
  }, [category, id]);

  return (
    <div>
         <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link> 
      <h1>{item.name}</h1>
      // Display more details as needed
    </div>
  );
}

export default ItemDetail;
