import React from 'react';
import Navbar from './util/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Sales from './sales/Sales';
import NewSale from './sales/NewSale';
import ClientList from './clients/ClientList';
import ProductListContainer from './saleItems/ProducstListContainer';
import NewClient from './clients/NewClient';
import NewSaleItem from './saleItems/NewSaleItem';
import EditSaleItem from './saleItems/EditSaleItem';
import Home from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditClient from './clients/EditClient';


const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3" >
        <div className="container-fluid">
          <Navbar/>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>}/> 
        
        <Route path='/clients' element={<ClientList/>}/>
        <Route path='/clients/:message' element={<ClientList/>}/>
        <Route path='/client/new' element={<NewClient/>}/>
        <Route path='/client/edit/:id' element={<EditClient/>}/>

        <Route path='/saleitems' element={<ProductListContainer/>}/>
        <Route path='/saleitems/:message' element={<ProductListContainer/>}/>
        <Route path='/saleitem/new' element={<NewSaleItem/>}/>
        <Route path='/saleitem/edit/:id' element={<EditSaleItem/>}/>

        <Route path='/sales' element={<NewSale/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;

/*




*/