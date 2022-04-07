import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function createConfig(token) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

async function createUser(user) {
  await axios.post(`${BASE_URL}/users`, user);
}

async function login(data) {
  const token = await axios.post(`${BASE_URL}/login`, data);
  return token;
}

async function getUser(token) {
  const config = createConfig(token);

  const user = await axios.get(`${BASE_URL}/users`, config);
  return user;
}

async function shortenLink(token, link) {
  const config = createConfig(token);

  await axios.post(`${BASE_URL}/urls/shorten`, { link }, config);
}

async function deleteLink(token, id) {
  const config = createConfig(token);

  await axios.delete(`${BASE_URL}/urls/${id}`, config);
}

const api = {
  createUser,
  login,
  getUser,
  shortenLink,
  deleteLink
}

export default api;