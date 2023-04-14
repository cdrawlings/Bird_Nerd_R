import axios from "axios";

const API_URL = '/api/bird'

//Register user
const createBird = async (birdData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + '/find-bird', birdData, config)

    return response.data
}

//Get all usrs spotted birds
const getAllBird = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const birdService = {
    createBird,
    getAllBird,
}

export default birdService