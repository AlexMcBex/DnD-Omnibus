import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryList from './components/CategoryList';
import ItemDetail from './components/ItemDetail';
import ErrorPage from './components/ErrorPage';
import './App.css'


function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <Routes>
        <Route exact path="/:category" Component={CategoryList} />
        <Route exact path="/:category/:id" Component={ItemDetail} />
        <Route  Component={ErrorPage} />
      </Routes>
    </div>
  );
}

export default App;
