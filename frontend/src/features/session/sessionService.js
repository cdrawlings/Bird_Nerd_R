import axios from "axios";

const API_URL = '/api/session/'

// create a bird watching session
// add-bird
const createSession = async (sessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, sessionData, config)

    return response.data
}


/*Get all bird watching sessions
const getSessions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
} */


//Get last bird watching sessions
const getSession = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const sessionService = {
    createSession,
    getSession,
}

export default sessionService