import axios from 'axios';
import qs from 'qs';


axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type']='charset=UTF-8';
axios.defaults.withCredentials = true;

// axios.defaults.transformRequest = [function(data, config){
//     if(!config['Content-Type']) return qs.stringify(data);
//     switch(config['Content-Type'].toLowerCase()){

//         case 'application/json;charset-uft-8':{
//             return JSON.stringify(data);
//         }

//         case 'multipart/form-data;charset=utf-8':{
//             return data;
//         }

//         default:{
//             console.log(data);
//             return qs.stringify(data);
//         }
//     }
// }];

//get
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            headers: {
                "Access-Session": localStorage.getItem('session'),
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

//post
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params), {
            headers: {
                "Access-Session": localStorage.getItem('session'),
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        })
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
    });
}


export function post1(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
                localStorage.setItem('session', res.headers["access-session"]);
                // console.log(localStorage.getItem('session'));
            }).catch(err => {
                reject(err.data)
            })
    });
}

export function post2(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(res => {
                console.log(res.headers)
                resolve(res.data);
                localStorage.setItem('validation', res.headers["access-session"]);
                // console.log(localStorage.getItem('session'));
            }).catch(err => {
                reject(err.data)
            })
    });
}

export function post_regist(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params), {
            headers: {
                "Access-Session": localStorage.getItem('validation'),
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        })
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
    });
}

export function storageObj(key, obj) {
    var checkedIdStr = JSON.stringify(obj);
    sessionStorage.setItem(key, checkedIdStr);
}

export function getObj(key) {
    return JSON.parse(sessionStorage.getItem(key));
}
