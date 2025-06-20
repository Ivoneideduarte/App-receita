import axios from 'axios'

/*
 * Rodar com IPV4: json-server --watch db.json --delay 180 --host 192.168.100.11 db.json
 
 * 
 */

const api = axios.create({
    baseURL: 'http://192.168.100.11:3000'
})

export default api