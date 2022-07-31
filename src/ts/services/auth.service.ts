import axios from '../plugins/axios';

/**
 * Function login. Make login request to api
 * @param {string} email
 * @param {string} password
 */
export async function login(email:string, password: string) {
  try {
    const res = await axios.post(`/auth/login`, JSON.stringify({ email, password}));
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}