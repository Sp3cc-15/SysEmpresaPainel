import axios from 'axios';

const api = axios.create({
  baseURL: 'https://testeapi.sysempresa.com.br/',
});

export default api;
