import {get,post} from './http';

export const apiAddress=p=>post('api/v1/users/',p);