import axios from 'axios'
import { KvizOdgovor, KvizSearch } from '../tipovi';
axios.defaults.withCredentials = true;
const SERVER_URL = 'https://localhost:8000'


export async function vratiKvizove(searchObj: Partial<KvizSearch>) {
  const res = await axios.get(SERVER_URL + '/kviz', {
    params: searchObj
  })
  return res.data as KvizOdgovor;
}

export async function kreirajKviz(naziv: string, kursId: number) {
  const res = await axios.post(SERVER_URL + '/kviz', {
    naziv,
    kurs: {
      id: kursId
    }
  })
  return res.data;
}

export async function obrisiKviz(id: number) {
  return axios.delete(SERVER_URL + '/kviz/' + id);
}