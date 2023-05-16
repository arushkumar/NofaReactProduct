export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
 // console.log(user);
    if (user && user.token) {
       return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
      //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }
  