import axios from 'axios';

export default axios.create({
  baseURL: 'https://osake-d4cfe.firebaseio.com'
});
