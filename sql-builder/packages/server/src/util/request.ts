import axios from 'axios'

export const sendPostRequest = async (url:string, data:object) =>{
    try {
        const response = await axios.post(
            url, 
            JSON.stringify(data), 
            {headers: { 'Content-Type': 'application/json'}}
        )
        return response.data
    } catch (error) {
        return {err: error}
    }
}

export const sendGetRequest = async (url:string)=>{
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        return {err: error}
    }
}