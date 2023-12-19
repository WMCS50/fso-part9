import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types'

import { apiBaseUrl } from "../constants";

/* export const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );
  return data;
} */

export const getAllEntries = async () => {
  return axios
    .get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)
    .then(response => response.data)
}


export const createEntry = (object: NewDiaryEntry)=> {
  return axios
    .post<DiaryEntry>(`${apiBaseUrl}/diaries`, object)
    .then(response => response.data)
}
