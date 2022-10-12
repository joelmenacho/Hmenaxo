import React, {useEffect, useState} from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel'
import Product from '../components/Product';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/productSlice";
import { getAllCategory, getStoreConfig } from "../redux/tiendaSlice";
import {
  Flex,
} from '@chakra-ui/react';


const Home = () => {
  const dispatch = useDispatch();
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const {listProduct} = useSelector((state) => state.product);
  const {store, categories} = useSelector((state) => state.tienda);



  useEffect( () => {
    dispatch(getStoreConfig());
    dispatch(getAllCategory());    
    dispatch(getAllProducts(pageNumber, pageSize, ''));
  }, [dispatch])


  const AllProduct = () => {

    return (
      listProduct.map((value, key) => (
        <Product key={key} value={value}/>
      ))
    )

  }



    return (
        <div className="App">
        <Header/>
        <main>
          <Carousel data={store}/>
  
          <div>

          <Flex flexWrap={"wrap"} m={100} gap="20" alignItems="center" justifyContent="center" flexDirection="row">
            {listProduct && <AllProduct/>}
          </Flex>
          </div>
        </main>
        <Footer data={store}/>
        <ToastContainer/>
      </div>
    )
}

export default Home;