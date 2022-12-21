import axios from "axios";

const API_URL = '/api/session/'

// create a bird watching session
// add-bird
const toggleSeen = async (sessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + '/toggle', sessionData, config)

    return response.data
}


const toggleService = {
    toggleSeen,
}

export default toggleService