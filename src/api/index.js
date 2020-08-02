//const BASE_URL = "http://localhost:4000"
const BASE_URL = "https://codiant.herokuapp.com"

const fetchOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  export const getRequest = async (endpoint) =>
  fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    method: 'GET',
  }).then(async (res) => {
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    // return response.data;
    return response.data;
  });


  export const postRequest = async (endpoint, body) =>
  fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  });

  export const putRequest = async (endpoint, body) =>
  fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  });