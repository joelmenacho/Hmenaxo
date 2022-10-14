import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginCard from '../components/LoginCard';
import { Box, Button, Text } from '@chakra-ui/react'
import axios from "axios";
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const VerifyUser = () => {
    const [userVerify, setUserVerify] = useState(false);
    const navigate = useNavigate();

    const notify = () => toast.success("Usuario verificado con éxito!. ya puede iniciar sesión");
    const notifyErr = () => toast.error("Error al registrar");

    useEffect( () => {
        setTimeout(() => {
            if (userVerify){
                navigate("/login");
            }
        }, 3000)
      
    }, [navigate, userVerify])

    const validateAccount = () => {
        console.log("validar cuenta");
        let query = queryString.parse(window.location.search.substring(1));
        let user_id = query.user_id;
        let timestamp = query.timestamp;
        let signature = query.signature;
        console.log(user_id);


        axios.post('http://127.0.0.1:8000/accounts/verify-registration/', {
            user_id,
            timestamp,
            signature
        }).then(response => {
            console.log(response.data);
            if (response.data.detail === "User verified successfully"){
                notify() ;
                setUserVerify(true);
            }
        }).catch(err => {
            notifyErr();
        });

      
    }


    return (
        <div className="App">
        <Header/>
        <main>
          <Box p={6} m={"auto"}>
          <Text fontSize='3xl'>Por favor activa tu cuenta</Text>

          <Button colorScheme='teal' size='md' m={"3"} onClick={validateAccount} >
            Activar cuenta
        </Button>
          </Box>
        </main>
        <Footer/>
        <ToastContainer />
      </div>
    )
}

export default VerifyUser;