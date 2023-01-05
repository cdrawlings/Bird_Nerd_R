import axios from "axios";

const API_URL = '/api/count'

// create a bird watching session
// add-bird
const postSeen = async (sessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + '/toggle', sessionData, config)
    return response.data
}


// Get birds seen in session
const getSeen = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/session-seen/" + id, config)

    return response.data
}


const toggleService = {
    postSeen,
    getSeen,
}

export default toggleService