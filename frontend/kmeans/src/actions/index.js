import axios from 'axios'
const API_URL = 'http://localhost:5555'
export const IRIS ='iris';

export function iris() {
    const request = axios.post(`${API_URL}/v1/kmeans/iris`)
    return {
        type: IRIS,
        payload:request
    }
}