import React from 'react';
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1 className='page-title'>Inventory Admin.</h1>
      <div className="products-list-background">
        <h1 className='products-title'>Available products</h1>
        <h1 className='categories-title'>Categories:</h1>
        <ProductList />
      </div>
      
      
    </div>
  );
};

export default App;