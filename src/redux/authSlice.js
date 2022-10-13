import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


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
        state.currentuser = null;
    },
    registerSucess(state, action){
        state.loading = false;
        state.isLogin = false;
        state.currentUser = action.payload.currentUser;
        state.isNewUser = true
    },
  }
})




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
                currentUser: {email},
                accessToken: access,
                refreshToken: refresh
            }))

        } catch (error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
        }
    }
}


export function register({email, password, firstName, lastName, password_confirm, dni}){

    return async dispatch => {
        dispatch(userSlice.actions.starLoading);
        try {
            const response = await axios.post('http://127.0.0.1:8000/accounts/register/', {
                password,
                email,
                password_confirm,
                dni,
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



export function getInitialize(){
    return async dispatch => {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if (accessToken && isValidateToken(accessToken) ){

            const response = await axios.get('http://127.0.0.1:8000/auth/users/me/',
                {
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${accessToken}`}
                }
            );

            const {email, id, username} = response.data;
            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.loginSucess({
                currentUser: {email, id, username},
                accessToken,
                refreshToken
            }))

        }

    }
}


export default userSlice.reducer;