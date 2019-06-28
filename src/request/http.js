import axios from 'axios';
import qs from 'qs';


axios.defaults.timeout=10000;
// axios.defaults.headers.post['Content-Type']='charset=UTF-8';
axios.defaults.withCredentials = true;

//get
export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params,
            headers:{"Access-Session": localStorage.getItem('session'),
            "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}
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
        axios.post(url,qs.stringify(params),{
            headers:{"Access-Session": localStorage.getItem('session'),
            "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}
        })
        .then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    });
}


export function post1(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(params))
        .then(res=>{
            resolve(res.data);
            localStorage.setItem('session', res.headers["access-session"]);
            // console.log(localStorage.getItem('session'));
        }).catch(err=>{
            reject(err.data)
        })
    });
}

export function post2(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(params),{
            headers:{"Access-Session": localStorage.getItem('session'),
            "Content-Type":"multipart/form-data;charset=utf-8"}
        })
        .then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data)
        })
    });
}