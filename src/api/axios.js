import { BASE_URL } from "./endPoints";
import axios from 'axios';

export default axios.create({
    baseURL: BASE_URL,
  });