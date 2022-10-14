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
import {login, getInitialize} from "../redux/authSlice";

  
  export default function LoginCard() {
    const dispatch = useDispatch();
    const {isLogin, currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();

    const initialValues = {email: '', password: ''};
    const onSubmit = (values) => {
      dispatch(login({'email': values.email, 'password': values.password}))
    }

    const formik = useFormik({initialValues, onSubmit});


    useEffect( () => {
      if (isLogin && currentUser){
        navigate('/');
      } else {
        dispatch(getInitialize());
      }

    }, [dispatch ,isLogin, currentUser])

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Iniciar sesión en Hmenaxo</Heading>
     
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>

            <form onSubmit={formik.handleSubmit}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={formik.handleChange} value={formik.values.email} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" onChange={formik.handleChange} value={formik.values.password}/>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Iniciar
                  </Button>
                </Stack>
              </form>


            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }