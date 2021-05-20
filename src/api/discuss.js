import {fetch,post} from '../utils/axios.js'

// 获取所有弹幕
export const _getAllMessage = (data) => {
    return fetch('/api/rabbitMQ/receiveMessage',data)
}
// 发送弹幕

export const _sendMessage = (data) => {
    return post('/api/rabbitMQ/sendMessage',data)
}