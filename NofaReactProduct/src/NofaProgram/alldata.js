import axios from 'axios';
class UserService {
    getAdminBoard() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const headers = {
      'Authorization': 'Bearer ' /* + user.accessToken*/,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  
    return axios.get('https://jsonplaceholder.typicode.com/posts/1', { headers: headers });
  }
}

export default new UserService();