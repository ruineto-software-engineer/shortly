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

  await axios.post(`${BASE_URL}/urls/shorten`, { url: link }, config);
}

async function shortenUrls(userId) {
  const shortenUrls = await axios.get(`${BASE_URL}/users/${userId}`);
  return shortenUrls;
}

async function deleteLink(token, id) {
  const config = createConfig(token);

  await axios.delete(`${BASE_URL}/urls/${id}`, config);
}

async function getUrl(shortenUrl) {
  const url = await axios.get(`${BASE_URL}/urls/${shortenUrl}`);
  return url;
}

async function getRanking() {
  const ranking = await axios.get(`${BASE_URL}/users/ranking`);
  return ranking;
}

async function getAllUrls() {
  const allUrls = await axios.get(`${BASE_URL}/urls`);
  return allUrls;
}

const api = {
  createUser,
  login,
  getUser,
  shortenLink,
  shortenUrls,
  deleteLink,
  getUrl,
  getRanking,
  getAllUrls
}

export default api;