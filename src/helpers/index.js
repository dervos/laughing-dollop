import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin']
axios.defaults.baseURL = 'https://api.500px.com/v1/'

export default axios

