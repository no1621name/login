import axios from '../plugins/axios';

export interface Countries{
  [key: number]: string,
}

export async function countries(): Promise<Countries>{
  try {
    const res = await axios.get(`/location/get-countries`);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}