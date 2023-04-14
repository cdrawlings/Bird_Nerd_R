import axios from "axios";

const API_URL = '/api/count'

//Register user
const addBird = async (birdData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + '/add-bird', birdData, config)

    return response.data
}

const addBirdService = {
    addBird,
}

export default addBirdService