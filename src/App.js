import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import SearchBar from './components/SearchBar';
import CategoryList from './components/CategoryList';
import ItemDetail from './components/ItemDetail';
import SubItemDetail from './components/SubItemDetail';
import ErrorPage from './components/ErrorPage';
import './App.css'


function App() {
  return (
    <div className="App">
      <Link to={'/'}> <h1>DnD Omnibus</h1></Link>
      {/* <SearchBar /> */}
      <Routes>
        <Route  path="/" Component={Navbar}/>
        <Route exact path="/:category" Component={CategoryList} />
        <Route exact path="/:category/:id" Component={ItemDetail} />
        <Route exact path="/:category/:id/:subId" Component={SubItemDetail} />
        <Route  Component={ErrorPage} />
      </Routes>
    </div>
  );
}

export default App;
