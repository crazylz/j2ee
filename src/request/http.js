import axios from 'axios';
import qs from 'qs';


axios.defaults.timeout=10000;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

//get
export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    });
}

//post
export function post(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(params))
        .then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    });
}