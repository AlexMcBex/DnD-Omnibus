import React, { useState } from 'react';
import axios from 'axios';

// This is your SearchBar component. 
// Here we're using React's useState hook to manage the search input.

function SearchBar() {
  const [input, setInput] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://www.dnd5eapi.co/api/${input}`);
    console.log(response.data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
