import axios from "axios";

const API_URL = '/api/bird'

//Register user
const createBird = async (birdData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, birdData, config)

    return response.data
}

const birdService = {
    createBird,
}

export default birdService