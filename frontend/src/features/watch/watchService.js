import axios from "axios";

const API_URL = '/api/session'

// create a new bird
const updateWatch = async (id, sessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + '/session/:id', sessionData, config)

    return response.data
}


//Get all bird watching sessions
const getWatch = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + '/session/:id', config)

    return response.data
}


const singleService = {

    getWatch,
}

export default singleService