import React, { useEffect } from 'react';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { formik, useFormik } from "formik";
import {useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {register, getInitialize} from "../redux/authSlice";

  
  export default function RegisterSimpleCard() {
    const dispatch = useDispatch();
    const {isLogin, currentUser, isNewUser} = useSelector((state) => state.user);
    const navigate = useNavigate();

    const initialValues = {
                            email: '',
                             password: '',
                             firstName: '',
                             lastName: '',
                             username: '',
                             password_confirm: '',
                             dni: ''
                            };
    const onSubmit = (values) => {
      dispatch(register({
        'email': values.email,
        'password': values.password,
        'firstName': values.firstName,
        'lastName': values.lastName,
        'password_confirm': values.password_confirm,
        'dni': values.dni
      }))
    }

    const formik = useFormik({initialValues, onSubmit});


    useEffect( () => {

      if (isLogin && currentUser){
        navigate('/');
      } else if (isNewUser && currentUser){
        alert("revisa tu bandeja de email");
      } else {
        dispatch(getInitialize());
      }

    }, [isLogin, currentUser, isNewUser])

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Registro | Completa tus datos</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>

            <form onSubmit={formik.handleSubmit}>
                <FormControl id="firstName">
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" onChange={formik.handleChange} value={formik.values.firstName} />
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text" onChange={formik.handleChange} value={formik.values.lastName} />
                </FormControl>

                <FormControl id="dni">
                  <FormLabel>DNI</FormLabel>
                  <Input type="number" onChange={formik.handleChange} value={formik.values.dni} />
                </FormControl>


                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={formik.handleChange} value={formik.values.email} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" onChange={formik.handleChange} value={formik.values.password}/>
                </FormControl>
                <FormControl id="password_confirm">
                  <FormLabel>Confirma contraseña</FormLabel>
                  <Input type="password" onChange={formik.handleChange} value={formik.values.password_confirm}/>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Continuar
                  </Button>
                </Stack>
              </form>


            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }