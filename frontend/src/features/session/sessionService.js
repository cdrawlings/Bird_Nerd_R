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

const sessionService = {
    createSession,

}

export default sessionService