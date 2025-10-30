import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = person_id => {
    return axios.delete(baseUrl+"/"+person_id)
}

const update = (id, personObject) => {
    return axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data)
}

export default { 
    getAll, 
    create,
    deletePerson,
    update
}