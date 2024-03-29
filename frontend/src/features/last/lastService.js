import axios from "axios";

const API_URL = '/api/session'

//Get the last session
const getLast = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + '/get-last', config)

    return response.data
}

const lastService = {
    getLast
}

export default lastService