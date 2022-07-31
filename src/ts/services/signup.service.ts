import axios from '../plugins/axios';

export async function signUp(requestObj: object) {
  try {
    const res = await axios.post(`/auth/signup`, JSON.stringify(requestObj));
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}