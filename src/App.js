import React from 'react';
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';

import './App.css';

const App = () => {
  return (
    <div>
      <h1 className='page-title'>Inventory Admin</h1>
      <div className="main-container">
        <CategoryList/>
        <ProductList />
      </div>
    </div>
  );
};

export default App;