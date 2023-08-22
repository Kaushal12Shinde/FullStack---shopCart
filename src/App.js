import './App.css';
import LoginSignup from './Component/LoginSignup/LoginSignup';
import Navbar from './Component/Navbar/Navbar';
import ProductPage from './Component/ProductPage/ProductPage';
import Products from './Component/Products/Products';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
         <Route exact path="/login" element={<LoginSignup/>}/>
         <Route exact path="/products" element={<Products/>}/>
         <Route exact path="/product/:id" element={<ProductPage/>}/>
         <Route  path="/products/:keyword" element={<Products/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
