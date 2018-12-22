import axios from 'axios';
import { getRedireactPath } from "../utils/util";

const AUTH_SUCCESS = 'auth_success';
const LOGOUT = 'logout';
const ERROR_MSG = 'error_msg';
const LOAD_DATA = 'load_data';

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    pwd:'',
    type:''
};
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedireactPath(action.payload),...action.payload};
        case ERROR_MSG:
            return {...state,msg:action.msg};
        case LOAD_DATA:
            return {...state,...action.payload};
        case LOGOUT:
            return {...initState,redirectTo:'/login'};
        default:
            return state
    }
}

export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}
export function logoutSubmit(){
    return {type:LOGOUT}
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
function authSuccess(data){
    return {type: AUTH_SUCCESS,payload:data}
}

export function update(data){
    return dispatch => {
        axios.post('/user/update',data).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function register({user,pwd,repeatPwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码输入错误')
    }
    if(pwd!==repeatPwd){
        return errorMsg('密码输入错误')
    }
    return dispatch => {
        axios.post('/user/register',{user,pwd,type}).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}