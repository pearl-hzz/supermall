import {request} from './request';
export function getDataList(){
    return request({
        url:'/home/multidata'
    })
}
export function getHomedata(type, page){
    return request({
        url:'/home/data',
        params: {
            type,
            page
        }
    })
}