import {
    post
} from '../utils/axios.js'

// 用户登录
export const _userLogin = (data) => {
    return post('/api/login', data)
}
export const _userReg = (data) => {
    return post('/api/register', data)
}