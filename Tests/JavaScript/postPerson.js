const axios = require('axios');

const postUrl = "http://localhost:3000/api/persons";

async function postPerson(params) {
  try {
    const response = await axios.post(postUrl, params);
    return response.status
  } catch (error) {
    return error.response.status
  }
}


module.exports = postPerson;
