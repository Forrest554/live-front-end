import {fetch,post} from '../utils/axios.js'

// 获取所有会议
export const _getAllLecture = () => {
    return fetch('/api/lecture/all')
}
export const _getNear= (data) =>{
    return post('/api/lecture/near', data)
}

export const _getLectureByPage= (data) =>{
    return post('/api/lecture', data)
}

export const _addLecture= (data) =>{
    return post('/api/lecture/add', data)
}

export const _searchLecture= (data) =>{
    return post('/api/lecture/search', data)
}
