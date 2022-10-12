import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Input,
  InputGroup,
  InputRightElement

} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon, ChevronDownIcon} from '@chakra-ui/icons';
import {useDispatch, useSelector } from "react-redux";
import {logoutUser, getInitialize} from "../redux/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import { Link as ReachLink } from "@react/router";
import { getAllProducts } from "../redux/productSlice";


// const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Simple() {
  const {isLogin, currentUser} = useSelector((state) => state.user);
  const {categories} = useSelector((state) => state.tienda);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [inputSearch, setinputSearch] = useState("");


  const { isOpen, onOpen, onClose } = useDisclosure();
  const notify = () => toast.success("sesión finalizada");



  const logoutUserBtn = () => {
    notify();
    dispatch(logoutUser());
  }

  const LoginStart = () => {
    navigate('/login')
  }

  const RegisterStart = () => {
    navigate('/registro')
  }


  useEffect( () => {
    if (!currentUser?.user?.email){
      dispatch(getInitialize());
    }
  }, [dispatch])


  const searchProduct = () => {
    dispatch(getAllProducts(pageNumber, pageSize, inputSearch));
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(getAllProducts(pageNumber, pageSize, inputSearch));
    }
  }

  return (
    <>
      <Box bg="#fff159" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link href="/">
                <Image src="/assets/image/logo_ml.png" />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>

              <Menu>
                <MenuButton bg={"#fff159"} variant={"primary"} as={Button} rightIcon={<ChevronDownIcon />}>
                  Categorías
                </MenuButton>
                <MenuList>

              {categories?.map((item) => (
                
                <MenuItem minH='48px' onClick={() => navigate(`/categoria/${item.id}/${item.name}/`)}>
                    <Image
                      boxSize='2rem'
                      borderRadius='full'
                      src={`http://127.0.0.1:8000${item.image_variaton.thumbnail}`}
                      alt=''
                      mr='12px'
                    />
                    <span>{item.name}</span>
                  </MenuItem>

              ))}


                  


                </MenuList>
              </Menu>

              <NavLink key={1}>Ofertas</NavLink>
            </HStack>

            <Box>
              <InputGroup>
                <InputRightElement
                children={<SearchIcon/>} onClick={searchProduct} />
                  <Input onKeyDown={handleKeyDown} placeholder='Buscar productos..' bg="white" size={"lg"} onChange={(e) => setinputSearch(e.target.value) }  />

              </InputGroup>
            </Box>
          </HStack>


          <Flex alignItems={'center'}>

            {!isLogin &&
              <Stack direction='row' spacing={4}>
              <Button  onClick={LoginStart} leftIcon={<MdLogin />} colorScheme='teal' variant='solid'>
                Iniciar sesión
              </Button>
              <Button onClick={RegisterStart} colorScheme='teal' variant='outline'>
                Crear cuenta
              </Button>
            </Stack>
            }

            {(isLogin && currentUser) && 
            <>
            <Box mr={"30px"} >{currentUser?.user?.username}</Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'md'}
                  src={'http://localhost:8000/media/' + currentUser?.image_profile}
                />
              </MenuButton>
              <MenuList>
                {currentUser?.user?.email &&
                  <MenuItem onClick={() => navigate("/perfil")}>Perfil</MenuItem>                
                }
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutUserBtn} >Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
            </>
            }
           
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  );
}