import axios from "axios";

const API_URL = '/api/session'

//Get the last spotted bird
const getLastSession = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + '/add-bird', config)

    return response.data
}

const lastSessionService = {
    getLastSession
}

export default lastSessionService