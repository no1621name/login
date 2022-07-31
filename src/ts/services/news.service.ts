import axios from '../plugins/axios';

export async function getNews() {
  try {
    const res = await axios.get(`/news`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}