import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel'
import Product from '../components/Product';
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    return (
        <div className="App">
        <Header/>
        <main>
          <Carousel/>
  
          <div>
          <Product/>
          <Product/> 
          </div>
        </main>
        <Footer/>
        <ToastContainer/>
      </div>
    )
}

export default Home;