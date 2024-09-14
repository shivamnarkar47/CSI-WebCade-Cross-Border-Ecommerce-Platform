
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
// Get a cookie
export const getCookie = (name: string) => {
  const cookie = Cookies.get(name);
  return cookie ? JSON.parse(cookie) : null;
};

export const handleLogout = () => {
  Cookies.remove('user');

}
// Example usage
const user = getCookie('user');
console.log(user); // { username: 'JohnDoe', token: 'abc123' }

