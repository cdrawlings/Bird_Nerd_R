import axios from "axios";

const API_URL = '/api/bird/'

//Get the last spotted bird
const getLast = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'add-bird', config)

    return response.data
}

const lastService = {
    getLast
}

export default lastService