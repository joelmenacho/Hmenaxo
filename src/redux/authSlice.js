import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    currentUser: {},
    error: null,
    isLogin: false,
    isNewUser: false
}

const setSession = (accessToken, refreshToken) => {
    if (accessToken && refreshToken){
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common.Authorization;
    }
}


const isValidateToken = accessToken => {
    if (!accessToken){
        return false;
    }
    const decoded = jwtDecode(accessToken);
    const currenTime = Date.now() / 1000;
    return decoded.exp > currenTime;
}



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    starLoading(state){
        state.loading = true;
    },
    stopLoading(state){
        state.loading = false;
    },
    getInitialState(state, action){
        state.loading = false;
        state.isLogin = action.payload.isLogin;
    },
    loginSucess(state, action){
        state.loading = false;
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.currentUser = action.payload.currentUser;
    },
    logoutUser(state){
        state.isLogin = false;
        state.currentUser = null;
        state.accessToken = null;
        state.refreshToken = null;
    },
    registerSucess(state, action){
        state.loading = false;
        state.isLogin = false;
        state.currentUser = action.payload.currentUser;
        state.isNewUser = true
    },
    updateSucess(state, action){
        state.loading = false;
        state.currentUser = action.payload.currentUser;
    }
  }
})



export function logoutUser(){

    return async dispatch => {
        dispatch(userSlice.actions.stopLoading());
        dispatch(userSlice.actions.logoutUser());
        setSession(null, null);

    }
}


export function login({email, password}){

    return async dispatch => {
        dispatch(userSlice.actions.starLoading);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: email,
                password
            });
            const {refresh, access} = response.data;
            setSession(access, refresh);
            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.loginSucess({
                accessToken: access,
                refreshToken: refresh
            }))

        } catch (error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
        }
    }
}


export function register({user_email, password, firstName, lastName, password_confirm, dni, user}){

    return async dispatch => {
        dispatch(userSlice.actions.starLoading);
        try {
            const response = await axios.post('http://127.0.0.1:8000/accounts/register/', {
                password,
                password_confirm,
                dni,
                username: user,
                email:user_email,
                first_name: firstName,
                last_name: lastName,
            });
            const {email, username, id} = response.data;

            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.registerSucess({
                currentUser: {email, username, id},
            }));

        } catch (error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
        }
    }
}


export function updateUser(dataForm){

    return async dispatch => {
        dispatch(userSlice.actions.starLoading);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/me',
            dataForm );
            const data = response.data;

            if (data.message !== 'user updated'){
                throw data
            }

            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.updateSucess({
                currentUser: data.data,
            }));

            toast.success("Perfil actualizo con éxito")

        } catch (error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
            toast.warning("Error al actualizar");
        }
    }
}




export function getInitialize(){
    return async dispatch => {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if (accessToken && isValidateToken(accessToken) ){

            const response = await axios.get('http://127.0.0.1:8000/api/users/me',
                {
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }
            );

            const {id, user, image_profile, phone, gender, dni, points} = response.data.data;
            setSession(accessToken, refreshToken);
            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.loginSucess({
                currentUser: {id, user, image_profile, phone, gender, dni, points},
                accessToken,
                refreshToken
            }))

        }

    }
}


export default userSlice.reducer;