import axios from '../plugins/axios';

export async function cities(ind: number): Promise<string[]>{
  try {
    const res = await axios.get(`location/get-cities/${ind}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}