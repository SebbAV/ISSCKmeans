import axios from 'axios'
const API_URL = 'http://localhost:5555/api'
export const IRIS ='iris';

export function iris(values) {
    console.log(values);
    values.k = parseInt(values.k)
    values.opt = parseInt(values.opt)
    const request = axios.post(`${API_URL}/kmeans/iris`,values)
    return {
        type: IRIS,
        payload:request
    }
}
